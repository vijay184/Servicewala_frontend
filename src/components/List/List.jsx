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
import ProviderDetails from "../ProviderDetails/ProviderDetails";

const List = ({ users, childClicked, isLoading, type, setType, listClick, setSelectedUserCoordinates, setListClick }) => {
  const [elRefs, setElRefs] = useState([]);

  // console.log("click", { childClicked });

  useEffect(() => {
    setElRefs((refs) => Array(users?.length)
      .fill()
      .map((_, i) => refs[i] || createRef()));
  }, [users]);

  useEffect(() => {
    // Fetch data again whenever the type changes
    setType(type);
  }, [type, setType]);

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
      <Typography variant="h5">Service Providers around you</Typography>
      {isLoading ? (
        <div style={{height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl
            style={{
              // margin: (theme) => theme.spacing(1),
              minWidth: 120,
              marginBottom: "30px",
            }}
          >
            <InputLabel style={{ marginTop: "1vh" }} id="type">
              Type
            </InputLabel>
            <Select
              style={{ marginTop: "2vh" }}
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="KabariWala">KabariWala</MenuItem>
              <MenuItem value="SabjiWala">SabjiWala</MenuItem>
              <MenuItem value="Hawkers">Hawkers</MenuItem>
            </Select>
          </FormControl>
          <Grid
            container
            spacing={3}
            style={{ height: "75vh", overflow: "auto" }}
          >
            {users?.map((user, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12} 
                  onClick={() => handleItemClick(i)}>
                <ProviderDetails
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

export default List;
