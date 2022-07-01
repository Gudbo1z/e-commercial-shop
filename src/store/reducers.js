import data from "../data"
export const reducers = {
    increase(state, action){
        state.sort((a, b) => {
            return (a.price - b.price)
        })
    },
    decrease(state, action){
        state.sort((a, b) => {
            return (b.price - a.price)
        })
    },
    onSale(state, action){
        return state.filter(item => item.status == 'sale')
    },
    reset: () => data
}

export const reducerCart = {
    increaseCart(state, action){
        return (state.productID.includes(action.payload.id)? 
        {...state}:
        {...state,
        productADD: true, 
        amount: state.amount+1, productID: [...state.productID, action.payload.id], 
        productInfor:[...state.productInfor, action.payload], 
        priceAmount:[...state.priceAmount, {price: action.payload.price, amount: 1, id:action.payload.id}]})
    },
    cartIncrease(state, action){
        return {...state, priceAmount: state.priceAmount.map((item, index)=>{
            return action.payload == index? {
                price: state.productInfor[index].price*(item.amount+1), amount: item.amount+1
            }:{...item}
        })}
    },
    cartDecrease(state, action){
        return {...state, priceAmount: state.priceAmount.map((item, index)=>{
            return action.payload == index? {
                price: state.productInfor[index].price*(item.amount-1), amount: item.amount-1
            }:{...item}
        })}
    },
    cartDelete(state, action){
        return {...state, priceAmount: state.priceAmount.filter((item, index)=>
            action.payload != index
        ), productInfor: state.productInfor.filter((item, index)=>
            action.payload != index
        ), amount: state.amount -1}
    },
    amountChange(state, action){
        return{...state, priceAmount: 
            state.priceAmount.map((item, index)=>{
                return (action.payload.id == index?
                {
                    price: state.productInfor[index].price*action.payload.value,
                    amount: action.payload.value}:
                {...item})
            })}
    }
}

export const reducersSeenProduct = {
    addToSeenProduct(state, action){
        return state.some(item => item.id == action.payload.id)?
        [...state]:[action.payload, ...state]
    },

}

export const reducersProductDetail = {
    openProductDetail(state, action){
        return action.payload
    }
}

export const reducersAside = {
    changeCategory(state, action){
        if(action.payload == 't-shirt') return {
            allproduct: false,
            tshirt: true,
            short: false,
            jean: false,
            shirt: false,
        }
        if(action.payload == 'short') return {
            allproduct: false,
            tshirt: false,
            short: true,
            jean: false,
            shirt: false,
        }
        if(action.payload == 'jean') return {
            allproduct: false,
            tshirt: false,
            short: false,
            jean: true,
            shirt: false,
        }
        if(action.payload == 'shirt') return {
            allproduct: false,
            tshirt: false,
            short: false,
            jean: false,
            shirt: true,
        }
        else return {
            allproduct: true,
            tshirt: false,
            short: false,
            jean: false,
            shirt: false,    
        }
    }
}