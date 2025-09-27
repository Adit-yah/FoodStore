import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "../features/foodSlice";
import cartReducer from "../features/cartSlice"

const store = configureStore({
    reducer :{
            food : foodReducer,
            cart : cartReducer
    }
})

export default store