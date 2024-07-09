import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@modules/Auth/authSlice";
import businessReducer from "@modules/Admin/BusinessProfile/BusinessProfileSlice"
import ProductReducer from "@modules/Products/ProductSlice"
import UserReducer from "@modules/UserList/UserSlice"
import DashboardReducer from "@modules/Dashboard/DashboardSlice"
import OrderReducer from "@modules/Orders/OrderSlice"
import DiscountReducer from "@modules/Discount/DiscountSlice"

// Combine all reducers.

// Define your initial state
const initialState = {
  auth: {}, // Add other reducers and their initial state here
  // Add other states here
};

const appReducer = combineReducers({
    auth:authReducer,
    businessProfile:businessReducer,
    products:ProductReducer,
    allusers:UserReducer,
    dashboard:DashboardReducer,
    orders:OrderReducer,
    discountOffer:DiscountReducer,
  });
  
  const rootReducer = (state, action) => {
    if (action.type === 'auth/logOut') {
      state = initialState;
    }
    return appReducer(state, action);
  };
  
  export default rootReducer;