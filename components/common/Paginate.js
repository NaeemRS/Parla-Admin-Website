import ReactPaginate from "react-paginate";
import { Icon } from "@iconify/react";
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function Paginate({ data, onPageDataChange }) {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const { theme } = useContext(ThemeContext);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset) || [];
  const pageCount = Math.ceil((data?.length || 0) / itemsPerPage);

  // 🔥 Send current page items back to parent
  useEffect(() => {
    onPageDataChange(currentItems);
  }, [itemOffset, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      breakClassName="  text-black font-bold"
      className="flex items-center gap-x-2 text-sm h-8"
      pageClassName={`md:h-[30px] md:w-[30px] w-5 h-5 flex items-center justify-center rounded ${theme === "dark" ? "bg-[#262626] text-white" : "bg-[#EEEEEE] text-[#4C4D4F]"
        }`}
      activeClassName={`  ${theme === "dark" ? "bg-[#FF6B00] !text-white" : "bg-[#FF6B00] text-white"
        }`}
      previousClassName="md:h-[30px] md:w-[30px] w-5 h-5 flex items-center justify-center"
      nextClassName="md:h-[30px] md:w-[30px] w-5 h-5 flex items-center justify-center"
      disabledClassName="opacity-[0.90]"
      nextLabel={<Icon icon="ooui:next-ltr" className={`w-6 cursor-pointer rounded-full h-6 bg-[#FF6B00] p-2 ${theme === "dark" ? "text-white" : "text-[#fff]"
        }`}
        width={15} height={15} />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<Icon
        icon="ooui:next-rtl"
        className={`w-6 cursor-pointer rounded-full h-6 bg-[#FF6B00] p-2 ${theme === "dark" ? "text-white" : "text-[#fff]"
          }`}
        width={15}
        height={15}
      />}
      renderOnZeroPageCount={null}
    />
  );
}
