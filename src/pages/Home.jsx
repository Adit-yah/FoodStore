import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import Store from '../components/Store'
import { useSelector } from 'react-redux'
import { foodData } from '../features/foodSlice'
import Cart from '../components/Cart'

const Home = () => {
   const food = useSelector(foodData)
   const containerRef =  useRef()
   //motion 
   const [newitem, setnewitem] = useState(false)

  return (
    food?.length != 0 
    ?
    <div
    ref={containerRef}
     className='bg-gray-200 h-screen overflow-scroll [&::-webkit-scrollbar]:hidden  w-full'>
        <NavBar/>
      <div className=''>
        <Store newItem={setnewitem} />
        <Cart newItem={newitem} dragArea={containerRef}/>
      </div>
    </div>
    : 
    <div className='h-screen w-screen flex items-center bg-white justify-center text-3xl'>
      loading...
    </div>
  )
}

export default Home