
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Container } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { SERVER } from '../..';

const Otp1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const { name, email, password, mobile_number, occupation, address, image, randomSixDigitNumber } =
    location.state || {};

  const sendDataFunction = async () => {
    try {
      const { data } = await axios.post(
        `${SERVER}/service_provider/service_provider_registration`,
        { name, email, password, mobile_number, occupation, address, image },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Successful Registration!!!!!!");
      navigate("/service_login");
    } catch (error) {
      console.log(error);
      console.log("Registration Failed");
      navigate("/");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpNumber = parseInt(otp, 10);
    if (randomSixDigitNumber === otpNumber) {
      sendDataFunction();
    } else {
      console.log("Incorrect OTP");
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="sm">
        <Paper sx={{ padding: '20px' }} elevation={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Enter your OTP
            </Typography>
            <Typography variant="body1" gutterBottom>
              A verification code has been sent to your mobile number.
            </Typography>
            <form onSubmit={handleOtpSubmit}>
              <TextField
                label="OTP"
                type="number"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
                Verify
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Otp1;
