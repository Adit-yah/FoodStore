import { createSlice } from "@reduxjs/toolkit";
import { getFoods } from "../utils/localStorageFunction";

const initialState = {
    foods : [] ,
    category : [] ,
    filterFoods : [],
    searchInput : '',
}

const foodSlice = createSlice({
    name : "food" ,
    initialState ,
    reducers :{
            setFoodsData : (state ) =>{
              state.foods = getFoods()
            },

            setCategory : ( state ) => {
                state.category = [  "All" ,  ...new Set(state.foods.map( food => food.category))]  
            },

            setFilterFoods : (state , action) => {
                state.filterFoods  = action.payload
            }, 
            setSearchInput : (state , action)=>{
                state.searchInput = action.payload
            }
    }

})
export const foodCategories = state => state.food.category
export const foodData = state => state.food.foods
export const filterFoods = state => state.food.filterFoods
export const searchInput = state => state.food.searchInput
export const { setFoodsData , setCategory , setFilterFoods , setSearchInput }  = foodSlice.actions
export default foodSlice.reducer