const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
    <form>
    
      filter shown with <input value={filter} onChange={handleFilterChange}/>
  
  </form>
  </div>
  )
}

export default Filter