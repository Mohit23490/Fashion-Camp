import { useEffect,useState,useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useSearchParams,useParams } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {fetchProductsByFilters} from "../redux/slices/productsSlice"
const CollectionPages = () => {
  const {collection} = useParams();
  const [searchParams]= useSearchParams();
  const dispatch = useDispatch()
  const {products,loading,error} = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  // const [Products, setProducts] = useState([])
  const sidebarRef = useRef(null);
  const [isSideBarOpen, setisSideBarOpen] = useState(false)

   useEffect(() => {
      dispatch(fetchProductsByFilters({collection, ...queryParams}))
   }, [dispatch,collection,searchParams])
   



  const toggleSidebar = () =>{
     setisSideBarOpen(!isSideBarOpen)
  }
  const handleClickOutside = (e) =>{
    // Close sidebar if clicked Outside
       if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
        setisSideBarOpen(false);
       }
  }
  useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, []);
  
  // useEffect(() => {
  //   setTimeout(() => {
  //        const fetchProducts =  [
  //  {
  //       _id:1,
  //       name:"Product 1",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=1"}]
  //   },
  //   {
  //       _id:2,
  //       name:"Product 1",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=2"}]
  //   },
  //   {
  //       _id:3,
  //       name:"Product 1",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=3"}]
  //   },
  //   {
  //       _id:4,
  //       name:"Product 1",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=4"}]
  //   },
  //    {
  //       _id:5,
  //       name:"Product 1",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=5"}]
  //   },
  //   {
  //       _id:6,
  //       name:"Product 1",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=6"}]
  //   },
  //   {
  //       _id:3,
  //       name:"Product 7",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=7"}]
  //   },
  //   {
  //       _id:8,
  //       name:"Product 8",
  //       price: 100,
  //       images:[{url:"https://picsum.photos/500/500?random=8"}]
  //   },
  //          ]
  //      setProducts(fetchProducts);
  //   },1000 );
  // },[]);
  
  return (
    <div className='flex flex-col lg:flex-row '>
      {/* Moblie Filter Button */}
       <button 
       onClick={toggleSidebar}
       className='lg:hidden border p-2 flex justify-center items-center '>
         <FaFilter className="mr-2" />Filters
       </button>

       {/* Filter Side bar */}
       <div ref={sidebarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full" } fixed inset-y-0 z-50 left-0 w-80 bg-white overflow-y-auto transisiton-transform duration-300 lg:static lg:translate-x-0 `}>
         <FilterSideBar />
       </div>
       <div className="grow p-4 ">
        <h2 className="text-2xl uppercase mb-4 ">All Collection </h2>
        {/* Sort Opitons  */}
        <SortOption />
        <ProductGrid products={products} loading={loading} error={error}/>
       </div>
    </div>
  )
}

export default CollectionPages