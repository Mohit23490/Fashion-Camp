import React from 'react'
import { MdDelete } from "react-icons/md";
import {useDispatch} from "react-redux"
import { updateCartItemQuantity,removefromCart } from "../../redux/slices/cartSlice"
const CartContent = ({cart,userId,guestId}) => {
    const dispatch = useDispatch();
    // Handle adding and subtracting to cart. 
    const handleAddToCart = (productId,delta,quantity,size,color) => {
         const newQuantity = quantity + delta;
         if(newQuantity >=1){
            dispatch(updateCartItemQuantity({
                productId,
                quantity:newQuantity,
                guestId,
                userId,
                size,
                color
            }))
         }
    };

    const handleRemovefromCart = (productId,size,color) => {
        dispatch(removefromCart({productId,guestId,userId,size,color}))
    }
    // const cartProduct = [
    //     {
    //         ProductId: 1,
    //         name:"T-shirt",
    //         size:"M",
    //         color:"Red",
    //         Price:"15",
    //         quantity:"2",
    //         image:"https://picsum.photos/200?random=1",
    //     },
    //     {
    //        ProductId: 2,
    //         name:"shirt",
    //         size:"l",
    //         color:"black",
    //         Price:"25",
    //         quantity:"2",
    //         image:"https://picsum.photos/200?random=2", 
    //     },
    // ]
  return (
    <div>
        {
           cart.products.map((product,index)=>(
           <div key={index} className='flex items-start justify-between py-4 border-b '>
              <div className='flex items-start'>
                 <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded '/>
                 <div>
                    <h3>{product.name}</h3>
                    <p className='text-sm text-gray-500'> size:{product.size} | color:{product.color} </p>
                    <div className='flex items-center mt-2 '>
                        <button 
                        onClick={() => handleAddToCart(product.productId,-1,product.quantity,product.size,product.color)}
                        className='border rounded px-2 py-1 text-xl font-medium '>-</button>
                        <span className='mx-4 '>{product.quantity}</span>
                        <button 
                          onClick={() => handleAddToCart(product.productId, +1, product.quantity, product.size, product.color)}
                         className='border rounded px-2 py-1 text-xl font-medium '>+</button>
                    </div>
                 </div>
              </div>
              <div>
                <p className='font-medium'>${product.price}</p>
                <button onClick={() => handleRemovefromCart(product.productId,product.size,product.color)}>
                 <MdDelete  className='h-6 w-6 mt-2 text-red-600'/>
                </button>
              </div>
           </div>
           ))
        }
    </div>
  )
}

export default CartContent
