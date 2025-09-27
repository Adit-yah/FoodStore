import { RiAddBoxLine, RiCheckboxIndeterminateLine, RiDeleteBin6Fill } from '@remixicon/react'
import { useDispatch } from 'react-redux'
import { decrement, increment, removeItem } from '../features/cartSlice'
import { toast } from 'react-toastify'
import { easeInOut, motion } from 'motion/react'

const CartItems = ({food}) => {
   const dispatch =  useDispatch()
  return (
    <motion.div 
    initial ={ {x:100 , opacity:0}}
    animate ={{x:0 , opacity:100}}
    transition={{duration:0.3 , ease:easeInOut  }}
    className='h-18 flex gap-1 w-full bg-white rounded-[5px] shadow shadow-black/40 px-2 py-1'>
   {/* image  */}
     <img className='h-full aspect-square object-contian' src={food.img} alt="" />
   {/*details*/}
    <div className='w-full flex flex-col justify-between '>
     {/* tittle + bin */}
        <div className='flex items-center w-full h-fit justify-between '>
        <h1 className='text-xl font-medium line-clamp-1 w-[88%]'>{food.name}</h1>
        <RiDeleteBin6Fill
          onClick={()=>{
            dispatch(removeItem(food))
            toast(`Removed ${food.name} x${food.quantity} from cart`)
          }}
         className='h-4 cursor-pointer active:scale-95'/>
        </div>
      {/* quantity increment and decrement and price */}
        <div className=' flex w-full items-center justify-between '>
          <h1 className='text-green-500 font-medium'>₹ {food.price}<span className='text-gray-500 opacity-60 font-medium text-sm'> x{food.quantity}</span></h1>
          <div className='flex gap-1.5 items-center text-gray-500'>
            <RiCheckboxIndeterminateLine 
            onClick={()=>{ 
              if(food.quantity > 1) dispatch(decrement(food))
            } } 
            className='h-6 hover:text-red-500 hover:opacity-100 opacity-40 cursor-pointer active:scale-95'/>

            <h1 className='text-xl text-black'>{food.quantity ? food.quantity : 1}</h1>

            <RiAddBoxLine 
            onClick={()=>dispatch(increment(food))}
            className='h-6 hover:text-green-500 hover:opacity-100 opacity-40 cursor-pointer active:scale-95'/>
          </div>
        </div>
    </div>

    </motion.div>
  )
}

export default CartItems