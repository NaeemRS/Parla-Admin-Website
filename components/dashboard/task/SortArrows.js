const SortArrows = ({ onSort, sortDirection = null }) => {   
  return (     
    <button       
      onClick={onSort}       
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex flex-col items-center justify-center"       
      title="Sort"     
    >       
      <Icon 
        icon="mynaui:chevron-up-solid" 
        width="20" 
        height="20"
        style={{ color: sortDirection === 'asc' ? '#FF6B00' : 'currentColor' }}
        className="transition-colors"
      />       
      <Icon 
        icon="mynaui:chevron-down-solid" 
        width="20" 
        height="20"
        style={{ color: sortDirection === 'desc' ? '#FF6B00' : 'currentColor' }}
        className="transition-colors"
      />     
    </button>   
  ); 
};  

export default SortArrows;