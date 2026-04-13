import  { useState,useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import Paypalbutton from './Paypalbutton'
import { useDispatch, useSelector } from 'react-redux'
import {createCheckout} from '../../redux/slices/checkoutSlice'
import axios from "axios"
const CheckOut = () => {

    //  const cart ={
    // products: [
    //     {
    //         ProductId: 1,
    //         name:"T-shirt",
    //         color:"Red",
    //         Price:"15",
    //         image:"https://picsum.photos/200?random=1",
    //     },
    //     {
    //        ProductId: 2,
    //         name:"shirt",
    //         color:"black",
    //         Price:"25",
    //         image:"https://picsum.photos/200?random=2", 
    //     },
    // ],
    // totalPrice:40,
    //  }
    const [checkoutId, setcheckoutId] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart,loading,error} = useSelector((state) => state.cart)
    const user = useSelector((state) => state.auth);




    const [shippingAddress, setshippingAddress] = useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        postalCode:"",
        country:"",
        phone:"",
    })

    // Ensure cart is not load before procceding. 
    useEffect(() => {
      if(!cart || !cart.products || cart.products.length === 0 ){
          navigate("/");
      }
    }, [cart,navigate])
    
    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        // setcheckoutId(123)
        if(cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
        checkoutItems: cart.products.map((item) => ({
            productId: item.productId,  
            name: item.name,
            price: item.price,         
            quantity: item.quantity || 1,
            image: item.image,
            size: item.size,
            color: item.color,
        })),
                shippingAddress,
                paymentMeathod:"Paypal",
                totalPrice:cart.totalPrice,
            }))
        if(res.payload && res.payload._id) {
            setcheckoutId(res.payload._id); // Set CheckoutId if Checkout was successful 

        }
    }
    }

//     const handleCreateCheckout = async (e) => {
//     e.preventDefault();
//     dispatch(createCheckout({
//         checkoutItems: cart.products.map((item) => ({
//             productId: item.productId,  
//             name: item.name,
//             price: item.price,         
//             quantity: item.quantity || 1,
//             image: item.image,
//             size: item.size,
//             color: item.color,
//         })),
//         shippingAddress: shippingAddress, 
//         paymentMeathod: "Paypal",          
//         totalPrice: cart.totalPrice,
//     }))
// }

    const handlePaymentSuccess = async (details) =>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,{
                paymentStatus:"paid",
                paymentDetails:details,
               },
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
                }
        )
            await handleFinalizeCheckout(checkoutId); // Finalize checkout Id if payment is Successful
        } catch (error) {
            console.error(error);

        }
        // navigate("/order-confrimation")
    };

    const handleFinalizeCheckout = async(checkoutId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
             navigate("/order-confrimation");
        } catch (error) {
            console.error(error);
        }
    }

    if(loading) return <p>Loading cart ...</p>
    if(error) return <p>Error:{error}</p>
    if(!cart || !cart.products || cart.products.length === 0){
        return <p>YOUR CART IS EMPTY</p>
    }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gpa-8 max-w-7xl mx-auto py-10 px-7 tracking-tighter'>
         {/* Left Section */}
        <div className='bg-white rounded-lg p-6'>
          <h2 className='text-2xl uppercase mb-6 '>
             Checkout
          </h2>
          <form onSubmit={handleCreateCheckout}>
            <h3 className='text-lg mb-4 '> Contact Details </h3>
            <div className='mb-4'>
              <label className='block text-gray-700 '>Email</label>
              <input type="email" value={user ? user.email : ""}  className='w-full p-2 border rounded '  
            //   disabled 
              />
            </div>
            <h3 className='text-lg mb-4 '> Delivery </h3>
            <div className='grid mb-4 grid-cols-2 gap-4 '>
              <div>
                <label className='block text-gray-700 '>First Name</label>
                <input type='text' className='w-full p-2 border rounded ' required 
                value={shippingAddress.firstName} 
                onChange={(e) =>{
                    setshippingAddress({...shippingAddress,firstName: e.target.value,
                    })
                }} />
              </div>
              <div>
                <label className='block text-gray-700 '>Last Name</label>
                <input type='text' className='w-full p-2 border rounded ' required 
                value={shippingAddress.lastName} 
                onChange={(e) =>{
                    setshippingAddress({...shippingAddress,lastName: e.target.value,
                    })
                }} />
              </div>
              
            </div>
            <div className='mb-4 '>
               <label className='block text-gray-700 '>Adress</label>
               <input 
               type="text"
                value={shippingAddress.address} 
                onChange={(e)=>{
                    setshippingAddress({
                        ...shippingAddress,address: e.target.value
                    })
                }} 
                className='w-full p-2 border rouonded '
                required
                />
            </div>
            <div className='grid mb-4 grid-cols-2 gap-4 '>
              <div>
                <label className='block text-gray-700 '>city</label>
                <input type='text' className='w-full p-2 border rounded ' required 
                value={shippingAddress.city} 
                onChange={(e) =>{
                    setshippingAddress({...shippingAddress,city: e.target.value,
                    })
                }} />
              </div>
              <div>
                <label className='block text-gray-700 '>Postal code</label>
                <input type='text' className='w-full p-2 border rounded ' required 
                value={shippingAddress.postalCode} 
                onChange={(e) =>{
                    setshippingAddress({...shippingAddress,postalCode: e.target.value,
                    })
                }} />
               </div>
              
            </div>
            <div className='mb-4 '>
               <label className='block text-gray-700 '>country</label>
               <input 
               type="text"
                value={shippingAddress.country} 
                onChange={(e)=>{
                    setshippingAddress({
                        ...shippingAddress,country: e.target.value
                    })
                }} 
                className='w-full p-2 border rouonded '
                required
                />
            </div>
            <div className='mb-4 '>
               <label className='block text-gray-700 '>Phone No.</label>
               <input 
               type="text"
                value={shippingAddress.phone} 
                onChange={(e)=>{
                    setshippingAddress({
                        ...shippingAddress,phone: e.target.value
                    })
                }} 
                className='w-full p-2 border rouonded '
                required
                />
            </div>
            <div className='mt-6 '>{
                !checkoutId ? (
                    <button type="submit" className='w-full bg-black text-white py-3 rounded '>
                        Continue to payment
                    </button>
                ) :( 
                <div>
                    <h3 className='text-lg mb-4 '>Pay with Paypal</h3>
                    <Paypalbutton amount={cart.totalPrice}  onSuccess={handlePaymentSuccess} onError={(err)=>{
                        alert("Payment failed. Try again. ")
                    }} />
                </div>
              )}</div>
          </form>
        </div>

        {/* Right Section */}
        <div className='bg-gray-50 p-6 rounded-lg '>
           <h3 className='text-lg mb-4 '> Order Summary </h3>
           <div className='border-t py-4 mb-4 '>
            {cart.products.map((product,index)=>(
                <div key={index} className='flex item justify-between py-2 border-b'>
                    <div className='flex items-start '>
                        <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 '/>
                        <div>
                            <h3 className='text-md '>{product.name}</h3>
                            <p className='text-gray-500'>Size:{product.size}</p>
                             <p className='text-gray-500'>Color:{product.color}</p>
                        </div>
                    </div>
                    <p className='text-xl'>${product.Price?.toLocaleString()}</p>
                </div>
            ))}
           </div>
           <div className='flex justify-between items-center text-lg mb-4 '>
              <p>subtotal</p>
              <p>${cart.totalPrice?.toLocaleString()}</p>
           </div>
           <div className='flex justify-between it text-lg'>
             <p>Shipping</p>
             <p>Free</p>
           </div>
           <div className='flex justify-between items-center text-lg mt-4 border-t pt-4 '>
            <p>Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
           </div>
        </div>
    </div>
  )
}

export default CheckOut