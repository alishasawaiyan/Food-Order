import React, { useEffect } from "react";
import "./App.css";
import {BrowserRouter,Route,Routes } from "react-router-dom";
import  Header  from "./components/layouts/Header";
import  Home  from "./components/layouts/Home";
import  Footer  from "./components/layouts/Footer";
import  Menu  from "./components/layouts/Menu";
import Login  from "./components/users/Login";
import Register  from "./components/users/Register";
import Profile  from "./components/users/Profile";
import UpdateProfile from "./components/users/UpdateProfile";
import ForgotPassword  from "./components/users/ForgotPassword";
import NewPassword  from "./components/users/NewPassword";
import store from "./store";
import {loadUser}  from "./actions/userAction";
import  Cart  from "./components/cart/Cart";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCartItems } from "./actions/cartAction";


export default function App() {

  //dispatched exactly once when the component is first rendered,
  //  and check if user is authenticated or not
  console.log(store);
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  
  //giving the axios error when fetching empty cart
  // const dispatch=useDispatch();
  // const {user}=useSelector((state)=>state.auth);
  // if(user){
  //   dispatch(fetchCartItems());
  // }
  
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eats/stores/:id/menus" element={<Menu />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Register />} />
            <Route path="/users/me" element={<Profile />} />
            <Route path="/users/me/update" element={<UpdateProfile />} />
            <Route path="/users/forgotPassword" element={<ForgotPassword />} />
            <Route path="/users/resetPassword/:token" element={<NewPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
            <Route path="/eats/orders/:id" element={<OrderDetails />} />
            <Route path="*" element={<h1>This Page Doesn't Exist!!</h1>} />
          </Routes>

        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}