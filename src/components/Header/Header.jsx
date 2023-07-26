import React, { useContext, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { StyledAppBar, StyledToolbar, StyledTypography } from "./styles";
import { Context } from "../..";
import axios from "axios";
import { Navigate,useNavigate } from "react-router-dom";
import { SERVER } from "../..";

const Header = () => {
const {setIsAuthenticated} = useContext(Context);
const navigate = useNavigate();

  const handleLogout = async () => {
    // console.log("kartik tyagi")
    try {
      await axios.get(`${SERVER}/customer/customer_logout`,{
          headers: {
              "Content-Type": "application/json",
          },
          withCredentials: true,
      });
      // console.log("Successful Logout!!!!!!");
    
    setIsAuthenticated(false); // remove token on logout click
    localStorage.removeItem("authTokenCustomer");
    localStorage.removeItem("Customer");
    navigate("/");
    
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <StyledAppBar >
      <StyledToolbar >
        <StyledTypography variant="h5">
          ServiceWala
        </StyledTypography>
        <button onClick={handleLogout}>SignOut</button>
      </StyledToolbar>
      
    </StyledAppBar>
  );
};

export default Header;
