import React, { useContext, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { StyledAppBar, StyledToolbar, StyledTypography } from "./styles";
import { Context } from "../..";
import axios from "axios";
import { Navigate,useNavigate } from "react-router-dom";
import { SERVER } from "../..";

const Header1 = () => {
const {setIsSAuthenticated} = useContext(Context);
const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${SERVER}/service_provider/service_provider_logout`,{
          headers: {
              "Content-Type": "application/json",
          },
          withCredentials: true,
      });
      console.log("Successful Logout!!!!!!");
    
    setIsSAuthenticated(false); // remove token on logout click
    localStorage.removeItem("authTokenService");
    localStorage.removeItem("Service_Provider");
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

export default Header1;
