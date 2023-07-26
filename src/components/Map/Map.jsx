import React, { useState, useEffect } from "react";
import {
  Marker,
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
} from "@react-google-maps/api";
import { useMediaQuery, Typography } from "@mui/material";
import { icon } from "../../assests/indes";
import { createCustomIcon } from "../../assests/indes";
import { useSelector } from 'react-redux';
import { getOnePendingData } from '../../api';


const Map = ({
  setCoordinates,
  coordinates,
  users,
  setchildClicked,
  userLocation,
  selectedUserCoordinates,
  setListClick,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [rasta, setDirections] = useState(null);
  const cust_email = localStorage.getItem("Customer");

  const requestStatus = useSelector((state) => state.requestStatus);

  // Function to fetch directions
  const getDirections = () => {
    if (selectedUserCoordinates && userLocation.lat && userLocation.lng) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: userLocation.lat, lng: userLocation.lng },
          destination: {
            lat: selectedUserCoordinates.lat,
            lng: selectedUserCoordinates.lng,
          },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            setDirections(response);
            // console.log("oi", response);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    } else {
      setDirections(null); // Clear directions if request status is false or not available
    }
  };

  useEffect(() => {
    getDirections();
  }, [selectedUserCoordinates, userLocation]);

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={coordinates}
        zoom={15}
        options={""}
        onClick={(e) => {
          setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }}
        apiKey = {process.env.GOOGLE_MAPS_API_KEY}
      >
        {/* Display the directions on the map */}
        {rasta && (
          <DirectionsRenderer
            directions={rasta}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 7,
              },
            }}
          />
        )}
        {users && users.length &&
          users.map((user, i) => (
            <Marker
              position={{ lat: user.latitude, lng: user.longitude }}
              key={i}
              onClick={() => {
                setSelectedMarker(user);
                setchildClicked(i);
                setListClick(i);
              }}
            >
              {selectedMarker === user && isDesktop && (
                <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                  <div style={{ width: '100px', height: '100px', display: 'flex', flexDirection: 'column', overflow: 'hidden', alignItems: 'center' }}>
                  <Typography variant="subtitle2" style={{ width: '100%', textAlign: 'center' }} gutterBottom>
                    {user.name}
                  </Typography>
                  <img
                    style={{ cursor: 'pointer', objectFit: 'contain', width: '100%', height: 'auto' }}
                    src={icon}
                    alt="User icon"
                  />
                </div>
                </InfoWindow>
              )}
            </Marker>
          ))}

        {/* Users own location mark */}
        {userLocation.lat && userLocation.lng && (
          <Marker
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            icon={createCustomIcon("blue")}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;