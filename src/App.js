import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Customer_Login from "./components/Login/Customer_Login"
import Customer_register from "./components/Register/Customer_register"
import Service_register from "./components/Register/Service_register"
import Service_Login from "./components/Login/Service_Login"
import LandingPage from "./components/landingPage/LandingPage"
import CustomerHomePage from "./components/customerhomepage/CustomerHomePage"
import Otp from "./components/otp/Otp";
import Otp1 from "./components/otp1/Otp1";
import { Context } from './index';
import ServiceHomePage from './components/serviceHomepage/ServiceHomePage';
import axios from 'axios';

const App = () => {
  const {isAuthenticated,setIsAuthenticated,isSAuthenticated,setIsSAuthenticated,setService,service} = useContext(Context);
  useEffect(()=>{
    const storedToken = localStorage.getItem("authTokenCustomer");
    const authenticatedCustomer = !!storedToken;

    const storedToken1 = localStorage.getItem("authTokenService");
    const authenticatedService = !!storedToken1;

    console.log("IsAuthenticated Value auth: ",authenticatedCustomer);
    setIsAuthenticated(authenticatedCustomer);
    setIsSAuthenticated(authenticatedService);
  },[]);
  
  return (
    <Router>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
        <Route path='/customer_login' element={<Customer_Login/>}/>
        <Route path='/customer_register' element={<Customer_register/>}/>
        <Route path='/service_register' element={<Service_register/>}/>
        <Route path='/service_login' element={<Service_Login/>}/>

        <Route path='/otp_verify' element={<Otp/>}/>
        <Route path='/otp_verify1' element={<Otp1/>}/>

        {
          isAuthenticated ? (
            <Route path='/customer_homepage' element={<CustomerHomePage/>}/>
          ):(
            <Route path='/' element={<LandingPage/>}/>
          )
        }

        {
          isSAuthenticated ? (
            <Route path='/service_homepage' element={<ServiceHomePage/>}/>
          ):(
            <Route path='/' element={<LandingPage/>}/>
          )
        }


        
        
      </Routes>
      </Router>

  )
}

export default App
