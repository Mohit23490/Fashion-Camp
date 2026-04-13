import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOption = () => {
  const [searchParmas, setsearchParmas] = useSearchParams()
  const handleSortchange = (e) => {
      const SortBy = e.target.value;
      searchParmas.set("SortBy",SortBy)
      setsearchParmas(searchParmas)
  }
  return (
    <div className='mb-4 flex items-center justify-end '>
      <select  id="sort" 
      onChange={handleSortchange}
      value={searchParmas.get("SortBy") || ""}
      className='border p-2 rounded-md focus:outline-none'>
        <option value="">Default</option>
        <option value="PriceAsc">Price: Low to High </option>
        <option value="PriceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOption