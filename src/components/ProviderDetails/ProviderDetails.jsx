import React from "react";
import { icon } from "../../assests/indes";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { setPending,getMyProfile } from "../../api";

const ProviderDetails = ({ user, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  let customer = {};
  getMyProfile().then((fetchedCustomer) => {
    customer.email = fetchedCustomer.email;
    customer.name = fetchedCustomer.name;
    customer.mobile_number = fetchedCustomer.mobile_number;
    customer.address = fetchedCustomer.address;
    customer.latitude = fetchedCustomer.latitude;
    customer.longitude = fetchedCustomer.longitude;
  }).catch((error) => {
    console.log("Error fetching customer details:", error);
  });

  const handleRequestClick = () => {    
    setPending(user.email,customer.email,customer.name,customer.mobile_number,customer.address,customer.latitude,customer.longitude);
  };
  return (
    <Card elevation={6} style={{ display: "flex", flexDirection: "row" }}>
      <CardContent
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6">
          {user.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PhoneIcon /> {user.mobile_number}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRequestClick}
        >
          Request
        </Button>
      </CardContent>
      <div
        style={{
          margin: "8px",
          borderRadius: "4px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <CardMedia
          component="img"
          style={{ height: 150, width: 150, objectFit: "contain" }}
          image={icon}
          alt="Image"
          title={user.name}
        />
      </div>
    </Card>
  );
};

export default ProviderDetails;
