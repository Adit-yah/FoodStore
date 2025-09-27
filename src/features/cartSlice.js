import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems : [] ,
    totalCost : 0 ,
    totalItems : 0,
    newitem : false 
}

const cartSLice = createSlice({
    name: "cart",
    initialState ,
    reducers : {
         
         addToCart : (state , action ) => {
            const newPayload = { ...action.payload , "quantity" : 1}
            state.totalCost  = state.totalCost + action.payload.price
            state.totalItems = state.totalItems + 1

            const isExist = state.cartItems.find( item => item.id === newPayload.id)
            if(!isExist){
               state.cartItems.push(newPayload) 
            }
            else {
               state.cartItems = state.cartItems.map( item => item.id === newPayload.id ? {...newPayload , "quantity" : item.quantity + 1} : item)
            }
         },

        removeItem : (state , action) =>{
                    state.cartItems = state.cartItems.filter( item => item.id !== action.payload.id )
                    state.totalItems = state.totalItems - action.payload.quantity
                    state.totalCost = state.totalCost - (action.payload.price * action.payload.quantity)
        },

        increment : (state , action) =>{
            state.cartItems = state.cartItems.map( item => item.id === action.payload.id ? { ...item , "quantity" : item.quantity + 1} : item)
            state.totalItems = state.totalItems + 1
            state.totalCost = state.totalCost + action.payload.price
         },

        decrement : (state , action) =>{
            state.cartItems = state.cartItems.map( item => item.id === action.payload.id ? { ...item , "quantity" : item.quantity - 1} : item)
            state.totalItems = state.totalItems - 1
            state.totalCost = state.totalCost - action.payload.price
         },

       setNewItem : (state , action) => {
         state.newitem = action.payload
       }

    }

})


export const cartItems = state => state.cart.cartItems
export const totalCost = state => state.cart.totalCost
export const totalItems = state => state.cart.totalItems
export const newitem = state => state.cart.newitem

export const { addToCart , removeItem , increment , decrement , setNewItem }  = cartSLice.actions

export default  cartSLice.reducer