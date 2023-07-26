import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import ProviderDetails1 from "../ProviderDetails1/ProviderDetails1";

const List1 = ({ users, childClicked, isLoading, listClick, setSelectedUserCoordinates, setListClick }) => {
  const [elRefs, setElRefs] = useState([]);

  // console.log("click", { childClicked });

  useEffect(() => {
    setElRefs((refs) => Array(users?.length)
      .fill()
      .map((_, i) => refs[i] || createRef()));
  }, [users]);

  const handleItemClick = (index) => {
    setListClick(index);
    const selectedUser = users[index];
    const selectedUserCoordinates = {
      lat: selectedUser.latitude,
      lng: selectedUser.longitude,
      email: selectedUser.cust_email
    };
    setSelectedUserCoordinates(selectedUserCoordinates);
  };

  return (
    <div style={{ padding: "25px",flex: 1, overflowY: "auto" }}>
      <Typography variant="h5">Users around you</Typography>
      {isLoading ? (
        <div style={{height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            style={{ height: "75vh", overflow: "auto" }}
          >
            {users?.map((user, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12} 
                  onClick={() => handleItemClick(i)}>
                <ProviderDetails1
                  user={user}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List1;
