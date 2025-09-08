// components/common/DataTable.js (Fixed component namessss)
'use client' 
import { ThemeContext } from "@/context/ThemeContext";
import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const DataTable = ({
  columns = [],
  data = [],
  onRowSelect,
  onSort,
  selectedRows = [],
  showCheckboxes = true,
  tableClassName = "",
  headerClassName = "",
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { theme } = useContext(ThemeContext);
  const { t } = useLanguage();
  
  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const newSortConfig = { key: columnKey, direction };
    setSortConfig(newSortConfig);

    if (onSort) {
      onSort(newSortConfig);
    }
  };

  const handleRowSelect = (rowId) => {
    if (onRowSelect) {
      onRowSelect(rowId);
    }
  };

  const sortedData = onSort
    ? data
    : [...(data || [])].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortConfig.direction === "asc" ? 1 : -1;
      if (bValue == null) return sortConfig.direction === "asc" ? -1 : 1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
// Helper to get nested value
const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

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
            {columns.map((column , index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-4 text-left lg:text-xl md:text-base whitespace-nowrap text-sm font-medium ${theme === "dark" ? "text-white" : "text-[#1E232C]"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium lg:text-xl md:text-base text-sm">{t(`table.${column.key}`, column.label)}</span>
                  {column.sortable !== false && (
                    <button
                      onClick={() => handleSort(index)}
                      className="flex items-center hover:bg-gray-100 rounded p-1 transition-colors"
                      aria-label={`Sort by ${t(`table.${column.key}`, column.label)}`}
                    >
                      <Icon
                        icon={
                          sortConfig.key === index
                            ? sortConfig.direction === "asc"
                              ? "material-symbols:keyboard-arrow-up"
                              : "material-symbols:keyboard-arrow-down"
                            : "material-symbols:unfold-more"
                        }
                        className={`w-4 h-4 ${sortConfig.key === column.key ? "text-gray-600" : "text-[#1E232C]"}`}
                      />
                    </button>
                  )}
                </div>
              </th>
            ))}
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
                <tr key={rowId}>
                  {showCheckboxes && (
                    <td className="px-6 py-4 md:rounded-l-[34px]">
                      <button
                        onClick={() => handleRowSelect(rowId)}
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
                   const value = getNestedValue(row, column.key) ?? "N/A";

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
                          <span className="text-xs md:text-sm font-bold">
                            {displayText}
                          </span>
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

export default DataTable;