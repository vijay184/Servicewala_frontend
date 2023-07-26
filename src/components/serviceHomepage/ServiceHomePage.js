import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CssBaseline, Grid } from "@mui/material";
import Header1 from '../Header1/Header1';
import List1 from '../List1/List1';
import Map1 from '../Map1/Map1';
import { getSpProfile, getPendingData } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { SERVER } from '../..';

const ServiceHomePage = () => {
  const { setIsSAuthenticated, service } = useContext(Context);
  const navigate = useNavigate();
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [locationFetched, setLocationFetched] = useState(false);
  const storedToken = localStorage.getItem("Service_Provider");
  const curr_email = storedToken;

  const [users, setUser] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [childClicked, setchildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserCoordinates, setSelectedUserCoordinates] = useState(null);
  const [listClick, setListClick] = useState(null);

  const requestStatus = useSelector((state) => state.requestStatus);
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });
  
  // console.log("waha se", requestStatus);
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
          `${SERVER}/service_provider/fetch_location`,
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
    setIsLoading(true);
    getPendingData(storedToken).then((data) => {
      setUser(data);
      setIsLoading(false);
    })
  }, [coordinates]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setUserLocation({ lat: latitude, lng: longitude });
        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);
      }
    );
  }, []);

  console.log()
  return (
    <>
      <CssBaseline />
      <Header1 />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={3}>
          <List1
            users={users} 
            childClicked={childClicked}
            isLoading={isLoading}
            listClick={listClick}
            setSelectedUserCoordinates={setSelectedUserCoordinates}
            setListClick={setListClick}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Map1
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            users={users}
            setchildClicked={setchildClicked}
            selectedUserCoordinates={selectedUserCoordinates}
            setListClick={setListClick}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ServiceHomePage;
