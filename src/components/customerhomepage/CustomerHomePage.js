import React, { useState, useEffect, useContext } from "react";
import { CssBaseline, Grid } from "@mui/material";
import axios from "axios";
import { getUserData } from "../../api/index";
import Header from "../Header/Header";
import List from "../List/List";
import Map from "../Map/Map";
import { Context } from "../..";
import { SERVER } from "../..";
// import ProviderDetails from "./components/ProviderDetails/ProviderDetails";

const CustomerHomePage = () => {
    const {isAuthenticated,setIsAuthenticated} = useContext(Context);
  const [users, setUser] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [locationFetched, setLocationFetched] = useState(false);
  const [childClicked, setchildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("All");

  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const [selectedUserCoordinates, setSelectedUserCoordinates] = useState(null);
  const [listClick, setListClick] = useState(null);
  const curr_email = localStorage.getItem("Customer");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLatitude(latitude);
          setCurrentLongitude(longitude);
          setCoordinates({ lat: latitude, lng: longitude });
          setLocationFetched(true);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLocationFetched(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationFetched(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 10000);
    // Use an async function to handle the Axios request
    const updateLocation = async () => {
      try {
        const { data } = await axios.post(
          `${SERVER}/customer/fetch_location`,
          {
            email: curr_email,
            latitude: currentLatitude,
            longitude: currentLongitude,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    // Call the updateLocation function here
    updateLocation();

    return () => clearInterval(interval);
  }, [currentLatitude, currentLongitude, curr_email]);
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getUserData(type,coordinates.lat,coordinates.lng).then((data) => {
      setUser(data);
      setIsLoading(false);
    })
  }, [coordinates,type]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setUserLocation({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={3}>
          <List
            users={users} 
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            listClick={listClick}
            setSelectedUserCoordinates={setSelectedUserCoordinates}
            setListClick={setListClick}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Map
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            users={users}
            setchildClicked={setchildClicked}
            userLocation={userLocation}
            selectedUserCoordinates={selectedUserCoordinates}
            setListClick={setListClick}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerHomePage;
