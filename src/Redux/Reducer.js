const myState = {
    cartItems: [],
    isLoginSuccess:false
};

const rootreducer = (state = myState, action) => {
    switch (action.type) {
      case 'ADD_ITEM_TO_CART':
        let oldItem = myState.cartItems.filter(item=>item.id === action.payload.id);
        if (oldItem.length === 1){
            oldItem[0].count += 1;
        } else {
            action.payload.count=1;
            myState.cartItems.push(action.payload);
        }
        return Object.assign({}, myState);                 
      case 'REMOVE_CART_ITEM':
          myState.cartItems.splice(myState.cartItems.indexOf(action.payload), 1);
          return Object.assign({}, myState); 
      case 'LOGIN_USER':
          myState.isLoginSuccess = action.payload;
          return Object.assign({}, myState);
      default:
          return state;
    }
}

export default rootreducer;

