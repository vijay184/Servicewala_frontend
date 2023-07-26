import React, { useState, useEffect } from "react";
import { icon } from "../../assests/indes";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { deletePending } from "../../api";
import { useSelector, useDispatch } from 'react-redux';
import { setRequestStatus, removePending } from "../../store/actions";
import { getOnePendingData } from '../../api';

const ProviderDetails1 = ({ user, selected, refProp }) => {
  const requestStatus = useSelector((state) => state.requestStatus);
  const dispatch = useDispatch();
  const sp_email = localStorage.getItem("Service_Provider");
  const [uniqueId, setUniqueId] = useState(null);

  useEffect(() => {
    getOnePendingData(sp_email, user.cust_email)
      .then((data) => {
        if (data && data.length > 0) {
          setUniqueId(data[0]._id);
        }
      })
      .catch((error) => {
        console.error("Error fetching pending data:", error);
      });
  }, [sp_email, user.cust_email]); 

  const handleRejectBtn = async () => {
    deletePending(sp_email, user.cust_email);
    dispatch(removePending(uniqueId));
  };

  const handleAcceptBtn = () => {
    dispatch(setRequestStatus(uniqueId, true));
  };

  const handleFinishBtn = () => {
    deletePending(sp_email, user.cust_email);
    dispatch(removePending(uniqueId));
  };

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6} style={{ display: "flex", flexDirection: "row", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f0f0f0", marginTop: "16px" }}>
      {/* Image Container */}
      <div style={{ width: "150px", height: "100%", borderRadius: "8px", overflow: "hidden" }}>
        <CardMedia
          component="img"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
          image={icon}
          alt="Image"
          title={user.name}
        />
      </div>
      {/* Content */}
      <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px", backgroundColor: "#fff" }}>
        <Typography gutterBottom variant="h6" style={{ fontWeight: "bold", marginBottom: "8px" }}>
          {user.name}
        </Typography>
        <Typography gutterBottom variant="subtitle2" style={{ marginBottom: "8px" }}>
          {user.address}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
        >
          <PhoneIcon fontSize="small" style={{ marginRight: "4px" }} /> 
          <span style={{ fontSize: "14px", fontWeight: "normal" }}>{user.mobile_number}</span>
        </Typography>
        {/* Buttons */}
        <div style={{ display: "flex", marginTop: "16px" }}>
          {requestStatus[uniqueId] === true ? ( // Check if request is accepted
            <Button variant="contained" color="primary" onClick={handleFinishBtn}>
              Finish
            </Button>
          ) : (
            <>
              <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={handleAcceptBtn}>
                Accept
              </Button>
              <Button variant="contained" color="secondary" onClick={handleRejectBtn}>
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderDetails1;
