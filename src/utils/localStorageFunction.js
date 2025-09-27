import foodsData from './localStorage'

const foods  = foodsData

function setFoods() {
    localStorage.setItem('foods' , JSON.stringify(foods))
}

function getFoods(){
     const foods = JSON.parse(localStorage.getItem('foods')) 
    return foods || []
}

export {setFoods , getFoods}