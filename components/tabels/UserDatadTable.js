'use client';
import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";
import { useContext, useState } from "react";

const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const compareValues = (a, b, direction) => {
  const normalize = (v) => {
    if (v === null || v === undefined) return '';
    if (typeof v === 'number') return v;
    return String(v).toLowerCase();
  };

  const va = normalize(a);
  const vb = normalize(b);

  if (typeof va === 'number' && typeof vb === 'number') {
    return direction === 'asc' ? va - vb : vb - va;
  }

  if (va < vb) return direction === 'asc' ? -1 : 1;
  if (va > vb) return direction === 'asc' ? 1 : -1;
  return 0;
};

const UserDataTable = ({
  columns = [],
  data = [],
  onRowSelect,
  onSort,
  selectedRows = [],
  showCheckboxes = true,
  tableClassName = "",
  headerClassName = "",
  onRowClick,
  rowClickable = false,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { theme } = useContext(ThemeContext);

  const handleSort = (columnKey) => {
    if (!columnKey) return;
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const newSortConfig = { key: columnKey, direction };
    setSortConfig(newSortConfig);
    onSort?.(newSortConfig);
  };

  const handleRowSelect = (rowId, e) => {
    e?.stopPropagation();
    onRowSelect?.(rowId);
  };

  const sortedData = onSort
    ? data
    : [...(data || [])].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);
        return compareValues(aValue, bValue, sortConfig.direction);
      });

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full border-separate md:border-spacing-y-4 border-spacing-y-2 ${tableClassName}`}>
        <thead className={headerClassName}>
          <tr>
            {showCheckboxes && (
              <th scope="col" className="px-6 py-4 w-12">
                <span className="sr-only">Select</span>
              </th>
            )}
            {columns.map((column, index) => {
              const isSortable = column.sortable !== false && column.key;
              const isActive = sortConfig.key === column.key;

              return (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-4 text-left lg:text-xl md:text-base whitespace-nowrap text-sm font-medium ${theme === "dark" ? "text-white" : "text-[#1E232C]"}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium lg:text-xl md:text-base text-sm">{column.label}</span>
                    {isSortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex items-center hover:bg-gray-100 rounded p-1 transition-colors"
                        aria-label={`Sort by ${column.label}`}
                      >
                        <Icon
                          icon={
                            isActive
                              ? sortConfig.direction === "asc"
                                ? "material-symbols:keyboard-arrow-up"
                                : "material-symbols:keyboard-arrow-down"
                              : "material-symbols:unfold-more"
                          }
                          className={`w-4 h-4 ${isActive ? "text-gray-600" : "text-[#1E232C]"}`}
                        />
                      </button>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="space-y-1">
          {!sortedData || sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                className={`px-6 py-8 text-center text-xs md:text-sm ${theme === "dark" ? "text-white" : "text-[#4C4D4F]"}`}
              >
                {data === undefined ? "Loading..." : "No data available"}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => {
              const rowId = row.id || row._id || row.taskId || index;
              return (
                <tr
                  key={rowId}
                  onClick={() => onRowClick?.(row, index)}
                  className={`${rowClickable ? "cursor-pointer hover:opacity-90" : ""}`}
                >
                  {showCheckboxes && (
                    <td className="px-6 py-4 md:rounded-l-[34px]">
                      <button
                        onClick={(e) => handleRowSelect(rowId, e)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label="Select row"
                      >
                        {selectedRows.includes(rowId) && (
                          <Icon
                            icon="material-symbols:check"
                            className="w-4 h-4 text-orange-500"
                          />
                        )}
                      </button>
                    </td>
                  )}
                  {columns.map((column, colIndex) => {
                    const value = column.key ? (getNestedValue(row, column.key) ?? "N/A") : "N/A";
                    const displayText =
                      typeof value === "string" && value.length > 20
                        ? value.slice(0, 20) + "..."
                        : value;

                    const isFirst = !showCheckboxes && colIndex === 0;
                    const isLast = colIndex === columns.length - 1;

                    return (
                      <td
                        key={colIndex}
                        className={`md:px-6 px-3 md:py-4 py-2 mb-2 md:text-sm text-xs whitespace-nowrap ${theme === "dark" ? "bg-[#262626] text-white" : "bg-[#EEEEEE] text-[#4C4D4F]"} ${isFirst ? "rounded-l-[34px]" : ""} ${isLast ? "rounded-r-[34px]" : ""}`}
                      >
                        {column.render ? (
                          column.render(value, row, index)
                        ) : (
                          <span className="text-xs md:text-sm font-bold">{displayText}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;