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

const Map1 = ({
  setCoordinates,
  coordinates,
  users,
  setchildClicked,
  selectedUserCoordinates,
  setListClick,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [rasta, setDirections] = useState(null);
  const [uniqueId, setUniqueId] = useState("");
  const sp_email = localStorage.getItem("Service_Provider");
  const [pendingData, setPendingData] = useState([]);

  const requestStatus = useSelector((state) => state.requestStatus);

  // Function to fetch directions
  const getDirections = () => {
    if(selectedUserCoordinates){
    getOnePendingData(sp_email,selectedUserCoordinates.email).then((data) => {
      // console.log(data[0]._id);
      if(data.length > 0){
        setUniqueId(data[0]._id);
      }
      // console.log(data[0]._id);
  }); 
    // console.log("dekh",selectedUserCoordinates);
    if (selectedUserCoordinates && coordinates.lat && coordinates.lng && requestStatus[uniqueId] === true) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: coordinates.lat, lng: coordinates.lng },
          destination: {
            lat: selectedUserCoordinates.lat,
            lng: selectedUserCoordinates.lng,
          },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            setDirections(response);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    } else {
      setDirections(null); // Clear directions if request status is false or not available
    }
  }
  };

  useEffect(() => {
    const fetchPendingData = async () => {
      const promises = users.map((user) => getOnePendingData(sp_email, user.email));
      const results = await Promise.all(promises);
      setPendingData(results);
    };

    fetchPendingData();
  }, [users, sp_email]);

  useEffect(() => {
    getDirections();
  }, [selectedUserCoordinates, coordinates, requestStatus]);

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
        apiKey={process.env.GOOGLE_MAPS_API_KEY} // Replace with your actual API key
      >
        {users && users.length > 0 &&
        pendingData.length === users.length &&
          users.map((user, i) => {
            const pendingUserData = pendingData[i][0];
            if (pendingUserData && requestStatus[pendingUserData._id] === true) {

              return (
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
              );}
              else{
                return null;
              }
            })}

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

        {/* Users own location mark */}
         { coordinates.lat && coordinates.lng && (
            <Marker
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
              icon={createCustomIcon("blue")}
            />
          )}
      </GoogleMap>
    </div>
  );
};

export default Map1;
