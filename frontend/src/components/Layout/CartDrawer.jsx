import { useNavigate } from "react-router-dom";
import CartContent from "../Cart/CartContent";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
const CartDrawer = ({DrawerOpen,toggleCartdrawer}) => {
  const navigate = useNavigate()
  const {user,guestId} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) =>state.cart);
  const userId = user ? user._id :null;
  const handleCheckout = () =>{
    toggleCartdrawer();
     if(!user){
        navigate("/login?redirect=checkout")
     }else{
       navigate("/checkout")
     }
    //  navigate("/checkout")
  }
  return (
    <div className={` fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-120 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${DrawerOpen?"trasnlate-x-0":"translate-x-full"}`}>
      {/* close button */}
      <div className="flex justify-end p-4 ">
         <button onClick={toggleCartdrawer}>
            <RxCross2  className="h-6 w-6 text-gray-600"/>
         </button>
        {/* Contain Card with Scrollable Area  */}
      </div>
      <div className="grow p-4 overflow-y-auto ">
           <h2 className="text-xl font-semibold mb-4">Your Cart </h2>
           {cart && cart?.products?.length > 0 ? (<CartContent cart={cart} userId={userId} guestId={guestId} />):(<p>Your Cart is empty.</p>)}
           {/* component for card contents */}
           {/* <CartContent /> */}
      </div>
      {/* Checkout button fixed at end  */}
      <div className=" p-4 bg-white sticky bottom-0">
      {cart && cart?.products?.length > 0 && (
        <>
           <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
        Checkout 
      </button>
      <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
        Shipping,taxes, and discount codes calculated at checkout.
      </p>
        </>
      )}
      {/* <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
        Checkout 
      </button>
      <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
        Shipping,taxes, and discount codes calculated at checkout.
      </p> */}
      </div>
    </div> 
  )
}

export default CartDrawer