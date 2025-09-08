'use client';
import { useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { ThemeContext } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

/**********************************************************
 *  DataTable (a.k.a AppointmentTable)
 *  • sort built-in
 *  • optional check-boxes
 *  • emits   onRowClick(rowObject)
 **********************************************************/
export default function DataTable({
  columns = [],
  data = [],
  onRowSelect,
  onRowClick,          // ⭐ NEW
  onSort,
  selectedRows = [],
  showCheckboxes = true,
  tableClassName = '',
  headerClassName = '',
}) {
  const { theme } = useContext(ThemeContext);
  const [sortCfg, setSortCfg] = useState({ key: null, dir: 'asc' });
  const { t } = useLanguage();

  /* ------------ helpers ------------- */
  const nested = (obj, path) =>
    path?.split('.').reduce((acc, k) => acc?.[k], obj);

  const sortData = () => {
    if (!onSort && sortCfg.key !== null) {
      return [...data].sort((a, b) => {
        const A = nested(a, columns[sortCfg.key].key);
        const B = nested(b, columns[sortCfg.key].key);
        if (A == null) return 1;
        if (B == null) return -1;
        if (A === B) return 0;
        return sortCfg.dir === 'asc' ? (A > B ? 1 : -1) : A > B ? -1 : 1;
      });
    }
    return data;
  };
  const displayed = sortData();

  const changeSort = (colIdx) => {
    const dir = sortCfg.key === colIdx && sortCfg.dir === 'asc' ? 'desc' : 'asc';
    setSortCfg({ key: colIdx, dir });
    onSort?.({ key: colIdx, dir });
  };

  /* ------------ render -------------- */
  return (
    <div className='overflow-x-auto'>
      <table
        className={`min-w-full border-separate md:border-spacing-y-4 border-spacing-y-2 ${tableClassName}`}
      >
        {/* ---------- header ---------- */}
        <thead className={headerClassName}>
          <tr>
            {showCheckboxes && <th className='px-6 py-4 w-10' />}
            {columns.map((c, i) => (
              <th
                key={i}
                className={`px-6 py-4 text-left whitespace-nowrap font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-[#1E232C]'
                }`}
              >
                <div className='flex items-center gap-1'>
                  {t(`table.${c.key}`, c.label)}
                  {c.sortable !== false && (
                    <button
                      onClick={() => changeSort(i)}
                      className='p-1 hover:bg-gray-100 rounded'
                    >
                      <Icon
                        icon={
                          sortCfg.key === i
                            ? sortCfg.dir === 'asc'
                              ? 'material-symbols:keyboard-arrow-up'
                              : 'material-symbols:keyboard-arrow-down'
                            : 'material-symbols:unfold-more'
                        }
                        className='w-4 h-4'
                      />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* ---------- body ------------ */}
        <tbody>
          {(!displayed || displayed.length === 0) && (
            <tr>
              <td
                colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                className={`px-6 py-8 text-center ${
                  theme === 'dark' ? 'text-white' : 'text-[#4C4D4F]'
                }`}
              >
                {t('table.noData', 'No data')}
              </td>
            </tr>
          )}

          {displayed.map((row, rIdx) => {
            const rowId = row._id || row.id || rIdx;

            return (
              <tr
                key={rowId}
                /* ⭐ ROW CLICK */
                onClick={() => onRowClick?.(row)}
                className={`${
                  onRowClick ? 'cursor-pointer hover:bg-orange-50' : ''
                }`}
              >
                {showCheckboxes && (
                  <td className='px-6 py-4 md:rounded-l-[34px]'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // don’t trigger row click
                        onRowSelect?.(rowId);
                      }}
                      className='w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200'
                    >
                      {selectedRows.includes(rowId) && (
                        <Icon icon='material-symbols:check' className='w-4 h-4 text-orange-500' />
                      )}
                    </button>
                  </td>
                )}

                {columns.map((c, cIdx) => {
                  const raw = nested(row, c.key);
                  const val =
                    typeof raw === 'string' && raw.length > 20 ? raw.slice(0, 20) + '…' : raw ?? 'N/A';
                  const first = !showCheckboxes && cIdx === 0;
                  const last = cIdx === columns.length - 1;

                  return (
                    <td
                      key={cIdx}
                      className={`md:px-6 px-3 md:py-4 py-2 whitespace-nowrap ${
                        theme === 'dark'
                          ? 'bg-[#262626] text-white'
                          : 'bg-[#EEEEEE] text-[#4C4D4F]'
                      } ${first ? 'rounded-l-[34px]' : ''} ${last ? 'rounded-r-[34px]' : ''}`}
                    >
                      {c.render ? c.render(val, row, rIdx) : (
                        <span className='font-bold text-xs md:text-sm'>{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}