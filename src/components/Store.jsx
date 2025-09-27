  import React, { useEffect, useRef, useState } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { filterFoods, foodCategories, foodData, searchInput, setCategory, setFilterFoods } from '../features/foodSlice'
  import FoodCard from './FoodCard'

  const Store = ({newItem}) => {

    const dispatch = useDispatch()
    const foods = useSelector(foodData)
    const filterFod = useSelector(filterFoods)
    const search = useSelector(searchInput)
    const categories = useSelector(foodCategories)
    const [itemsScroll, setitemsScroll] = useState(false)
    const [fooditems, setfooditems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('All')
    const stickyRef = useRef(null)
    
    function categoryHandler(e){ 
          const items = ( !search ? foods : filterFod).filter((i)=>{
            if( e == 'All') return true 
            else if( e == i.category) return true
            else return false
          }) 
          setCurrentCategory(e)
          setfooditems(items)
    }
 
    useEffect(()=>{ 

    function handleScroll  (){
      const ontop = stickyRef.current.getBoundingClientRect().top
      if(ontop == 0 && !itemsScroll ) setitemsScroll(true)
      else setitemsScroll(false)
    }
    document.addEventListener('wheel' , handleScroll)

      if(search) {
        setfooditems(filterFod) 
        setCurrentCategory('All')}
      if( filterFod.length == 0 && foods.length != 0 && !search ) setfooditems(foods)
      if( categories.length == 0) dispatch(setCategory())
      
    return ()=>{
      document.removeEventListener('wheel' , handleScroll)
    }

    } , [filterFod , categories , search , dispatch  ])

    return (
      <div>
        {/* filter button and tittle  */}
        <div ref={stickyRef} className='sticky top-0 left-0 md:px-9 md:py-4  px-4 py-3 bg-gray-200 '>
          <h1 className='text-3xl font-medium z-10 mt-2 text-gray-600 hover:text-green-500  w-fit '>Find the best food...</h1>
          <div className="categories mt-5 flex md:w-fit [&::-webkit-scrollbar]:hidden  overflow-x-scroll  md:overflow-visible gap-3">
            { categories?.map( (e , idx) =>
              <button 
              key={idx} 
              onClick={ () => categoryHandler(e)} 
              className={`px-4 outline-0 ${(e == currentCategory ) ?  'bg-green-500 text-white' : 'bg-gray-300'} transition-colors duration-300  hover:bg-green-500 cursor-pointer hover:text-white rounded py-[4px] text-sm font-medium`}>{e}</button>
            ) }
          </div>
        </div>
        {/* food cards  */}
        <div className={`h-[80%] w-fit  ${ itemsScroll ? 'overflow-y-scroll' : 'overflow-y-hidden' }   [&::-webkit-scrollbar]:hidden md:px-7 md:py-4 px-4 py-3`}>
        {  fooditems?.length != 0 
           ?   
         <div className="foods grid  gap-2 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
         { fooditems?.map(  ( f , idx) =><FoodCard setBounceCartICon={newItem} key={idx} food={f} />  )  }        
         </div>
          : 
          <p className=' text-gray-700 px-2 '>No food items named <span className='text-red-500  text-lg'>'{search}'</span> found in the <span className='text-green-500 text-lg'>'{currentCategory}'</span> category.</p>
          }
        </div>
      </div>
    )
  }

  export default Store