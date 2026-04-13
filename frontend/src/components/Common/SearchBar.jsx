import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate,} from "react-router-dom";
import {useDispatch} from "react-redux"
import {setFilters, fetchProductsByFilters} from '../../redux/slices/productsSlice'
const SearchBar = () => {
    const [SearchTerm, setSearchTerm] = useState("")
    const [isOpen, setisOpen] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearchToggle = (e) =>{
       setisOpen(!isOpen)
    }
    const  handleSearch = (e) =>{
      e.preventDefault();
      setisOpen(false)
      dispatch(setFilters({search: SearchTerm}));
      dispatch(fetchProductsByFilters({search: SearchTerm}));
      navigate(`/collections/all?search=${SearchTerm}`);
      // setSearchTerm("")
    }
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen?"absolute top-0 left-0 bg-white h-24 z-50" :"w-auto "}`}>
        {isOpen ? (<form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
            <div className="relative w-1/2">
              <input type="text" 
              placeholder="Search" 
              value={SearchTerm}
              onChange={(e)=>{
                setSearchTerm(e.target.value)
              }}
              className=" px-4 py-2 pl-2 pr-12 rounded-lg w-full bg-gray-100 focus:outline-none placeholder:text-gray-700" />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                  <IoSearchSharp className='h-6 w-6 text-gray-700' />
              </button>
            </div>
            <button type="button" 
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <RxCross2 className="h-6 w-6"/>
            </button>
        </form>):
         (<button onClick={handleSearchToggle}>
             <IoSearchSharp className='h-6 w-6 text-gray-700' />
         </button>)}
    </div>
  )
}

export default SearchBar