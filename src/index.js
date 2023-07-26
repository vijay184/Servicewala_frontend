import React, { useState,createContext } from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.js";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import store from "./store/index.js";

export const SERVER = "https://servicewala-backend.onrender.com";

export const Context = createContext({ isAuthenticated: false , isSAuthenticated:false});
const AppWrapper = () => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isSAuthenticated,setIsSAuthenticated] = useState(false);
    const [customer,setCustomer] = useState({});
    const [service,setService] = useState({});
    return (
        <Provider store={store}>
        <Context.Provider value={{
            isAuthenticated,setIsAuthenticated,isSAuthenticated,setIsSAuthenticated,customer,setCustomer,service,setService
        }}>
            <App/>
        </Context.Provider>
        </Provider>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
        <AppWrapper />
      <Toaster />
  </React.StrictMode>
);