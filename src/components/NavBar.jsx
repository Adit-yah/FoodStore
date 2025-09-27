import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  foodData, searchInput, setFilterFoods, setSearchInput } from '../features/foodSlice'

const NavBar = () => {

   const [search, setSearch] = useState('')
  //  const [searchInfo, setSearchInfo] = useState([])
   const searchin = useSelector(searchInput)
   const food = useSelector(foodData)
   const dispatch = useDispatch()

   

   function searchList (e){

     setSearch(e.target.value) 
     dispatch(setSearchInput(e.target.value))
     if(e.target.value.length > 0){
       //  const foodNames = food.filter( f => f.name.toLowerCase().includes(e.target.value.trim().toLowerCase())).map( i => i.name)
       const filterFoodsItesm = food.filter( f => f.name.toLowerCase().includes((e.target.value.replace(/\s+/g ,' ').trim().toLowerCase())))   
       dispatch(setFilterFoods(filterFoodsItesm))
     }
     else { 
      dispatch(setFilterFoods(food))
      dispatch(setSearchInput(' '))
      // setSearchInfo([])
      }
   }

  //  function dropDownClickHandler (e){
    
  //   setSearch(e.target.textContent)
  //   setSearchInfo([])
  //   const fods = food.filter( f => f.name.toLowerCase().includes(e.target.textContent.toLowerCase()))
    
  //    dispatch(setFilterFoods(fods))
  //  }
   
   
  return (
    <nav className='flex  px-4 py-3 md:px-9 md:py-2 gap-4  md:flex-row  mt-2 flex-col md:items-center md:justify-between '>
        <div>
            <h1 className='font-bold text-xl text-gray-600'>{(new Date().toUTCString().slice(0 , 16)) }</h1>
            <h1 className='font-md text-md text-green-600 '>Flavoro Foods</h1>
        </div>
        <div className='relative '>
        <input
         onChange={ e => searchList(e)}
         value={search}
         type="serach"
         name='search'
         placeholder='search items'
         className='border outline-0 md:fixed right-10 top-6 rounded py-2 px-5 md:max-w-90 w-full z-20 bg-white '
          />
         {/* {
          searchInfo.length != 0 &&
          <div className="dropdown absolute z-40 rounded mt-1  bg-white w-full px-1 py-2">
           <div className=' overflow-scroll  [&::-webkit-scrollbar]:hidden  max-h-70'>
            {searchInfo?.map( (n , id)=>
            <h1 
             key={id}
             onClick={e => dropDownClickHandler(e)}
             className='text-gray-500 h-fit w-full px-2 mb-[1px] cursor-pointer hover:text-white hover:bg-green-500'
             >{n}
             </h1>)}
           </div>
          </div>} */}
        </div>
    </nav>
  )
}

export default NavBar