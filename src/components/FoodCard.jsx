import { RiStarFill, RiStarHalfLine, RiStarLine } from "@remixicon/react";
import { useDispatch } from "react-redux";
import { addToCart, setNewItem} from "../features/cartSlice";
import { toast } from "react-toastify";

const FoodCard = ({food }) => {
 
    const dispatch =  useDispatch()
    function ratting(ratting) {
        const star = []
        for ( let i = 1  ; i<=5 ; i++){
            if( i <= Math.floor(ratting)) star.push(1)
            else if( i -  ratting  === 0.5) star.push(0.5)
            else star.push(0)
        }
        return star
    }
    

  return (
    <div className="bg-white rounded overflow-hidden  flex flex-col h-92 w-full min-w-65  gap-2.5 p-4 ">
      <img className="rounded h-48" src={food.img}/>
      <div className="flex items-center justify-between gap-1.5 text-lg font-bold">
      <h1 className="text-gray-400 line-clamp-1  ">{food.name}</h1>
      <h1 className="text-green-500 ">₹{food.price}</h1>
      </div>
      <p className="text-sm leading-5 line-clamp-2 my-2   text-gray-700">{food.desc}</p>
      <div className="flex items-center justify-between ">
        <p className=" text-yellow-400 flex ">
         {
            ratting(food.rating).map(( n , id) =>{
                if ( n == 1) return <RiStarFill key={id} className="w-5"/> 
                else if ( n == 0.5) return <RiStarHalfLine key={id} className="w-5"/>
                else return <RiStarLine key={id} className="w-5"/>
            })
         }
          </p> 
        <button
         onClick={()=>{ 
          dispatch(addToCart(food))
          dispatch(setNewItem(true))
          setTimeout(() => {
          dispatch(setNewItem(false))
          }, 300);
          toast(`${food.name} Added to Cart`)
        }}
         className="px-5 py-[3px] active:scale-95 bg-green-500 outline-0 rounded text-white">Add to cart</button>
      </div>
    </div>
  )
}

export default FoodCard;
