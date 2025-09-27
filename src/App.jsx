import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Error from './pages/Error'
import Home from './pages/Home'
import Success from './pages/Success'
import { getFoods, setFoods } from './utils/localStorageFunction'
import { useDispatch, useSelector } from 'react-redux'
import { foodData, setFoodsData } from './features/foodSlice'


const App = () => {

  const foods = getFoods()
  const items =  useSelector(foodData)
  const dispatch = useDispatch() 
  

  useEffect(()=>{ 
      if(foods.length === 0) {
        setFoods()
      }

      if(items.length === 0){
        dispatch(setFoodsData()) 
      }
  } , [items , foods ])

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/success' element={<Success/>} />
      <Route path='/*' element={<Error/>} />
    </Routes>
  )
}

export default App