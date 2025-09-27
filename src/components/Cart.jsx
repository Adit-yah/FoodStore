import { RiAddCircleLine, RiAddFill, RiShoppingCartFill } from '@remixicon/react'
import { useRef, useState } from 'react';
import CartItems from './CartItems';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartItems, newitem, totalCost, totalItems } from '../features/cartSlice';
import { AnimatePresence , anticipate, easeInOut, motion, spring } from 'motion/react';

const Cart = ({dragArea}) => {

//motion time 
//  drag Area 
const [isDragging, setIsDragging] = useState(false);
   
 const navigate =  useNavigate()
 const cartItms = useSelector(cartItems)
 const totalCst = useSelector(totalCost)
 const isBounce = useSelector(newitem)
 const totalItms = useSelector(totalItems)
 const [toggle, settoggle] = useState(true)

 function toggleHandler (){
    settoggle(!toggle)
 }

  return (
    <>
   { toggle &&
    // cart close
    <motion.div 
    drag 
    dragConstraints={dragArea}
  animate={isBounce ? { y: -29 } : { y: 0 }}
  transition={{
    type: "spring",
    stiffness: 200,  // how stiff the spring is
    damping: 8,    // how bouncy it feels
  }}
    onDragStart={()=> setIsDragging(true)}
    onDragEnd={()=>setIsDragging(false)}
    onClick={() =>{ if(!isDragging) toggleHandler()}}
    className='fixed bottom-2 right-2 active:scale-95 z-50 cursor-pointer bg-yellow-400 aspect-square w-15 rounded-full flex items-center justify-center shadow-sm shadow-green-500/60'>
    <RiShoppingCartFill />
    </motion.div>}
    
    <AnimatePresence>
    { !toggle &&
    // cart open
    <motion.div 
    initial = {{x : 100 , opacity : 0 }}
    animate = {{x : 0 , opacity : 1 }}
    exit = {{x : 100 , opacity : 0}}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    className={`px-4 py-10 md:py-4 z-40 w-80 h-[85%] fixed bottom-2 right-2 flex flex-col justify-evenly gap-2 rounded-[8px] shadow-sm shadow-black bg-gray-200`}>
        {/* header */}
        <div className='relative  '>
        <h1 className='text-xl font-bold uppercase text-center text-gray-600 '>My Orders</h1>
        <hr className=' mt-2 mb-1  text-gray-400' />
        <RiAddCircleLine 
        onClick={()=>toggleHandler()}
        className='rotate-45 absolute hover:text-black active:scale-95 top-0 aspect-square h-6 right-1 text-gray-400 cursor-pointer'/>
        </div>
        {/*cart  items */}
        <div className="items gap-1 flex flex-col p-1  overflow-y-scroll [&::-webkit-scrollbar]:hidden h-[70%] ">
           {
            cartItms.length != 0 
            ? cartItms?.map( (f ) =>{
                return <CartItems key={f.id} food={f}/> 
            })
            : <p className="text-center text-gray-600 text-lg animate-pulse">🛒 No Orders Yet!</p>
        }
        </div>
        {/* .analysis cost and items */}
        <div className=' text-md '>
            <h1>
                <span className='text-gray-500 font-medium'>Total Items</span>
                <span className='inline-block  pl-3 pr-2 font-bold text-gray-500'>:</span>
                <span className='text-gray-500 font-medium'>{totalItms.toString().padStart( 2 , 0)}</span>
            </h1>
            <h1>
                <span className='text-gray-500 font-medium'>Total Cost</span>
                <span className='inline-block pl-5 pr-2 font-bold text-gray-500'>:</span>
                <span className='text-green-500 font-medium'>₹ {parseInt(totalCst).toFixed(2)}</span>
            </h1>
        </div>
        {/* checkout -button */}
        <button 
        onClick={()=>navigate('/success')}
        className='w-full px-4 py-2 text-md cursor-pointer active:scale-95  font-medium bg-green-500 rounded-[5px] text-white'>CheckOut</button>
    </motion.div>
    }
    </AnimatePresence>
  </>
  )}

export default Cart



