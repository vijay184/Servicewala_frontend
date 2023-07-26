
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Menu, MenuItem } from '@mui/material';
import { kabbadiwala, sabjiwala, hawker } from '../../assests/indes';
import './style.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [customerMenuAnchor, setCustomerMenuAnchor] = React.useState(null);
  const [serviceMenuAnchor, setServiceMenuAnchor] = React.useState(null);

  const handleCustomerButtonClick = (event) => {
    setCustomerMenuAnchor(event.currentTarget);
  };

  const handleServiceButtonClick = (event) => {
    setServiceMenuAnchor(event.currentTarget);
  };

  const handleCustomerMenuClose = () => {
    setCustomerMenuAnchor(null);
  };

  const handleServiceMenuClose = () => {
    setServiceMenuAnchor(null);
  };

  const handleCustomerSignUp = () => {
    navigate('/customer_register');
    handleCustomerMenuClose();
  };

  const handleCustomerSignIn = () => {
    navigate('/customer_login');
    handleCustomerMenuClose();
  };

  const handleServiceSignUp = () => {
    navigate('/service_register');
    handleServiceMenuClose();
  };

  const handleServiceSignIn = () => {
    navigate('/service_login');
    handleServiceMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            ServiceWala
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button color="inherit" onClick={handleCustomerButtonClick}>
              Customer
            </Button>
            <Menu
              anchorEl={customerMenuAnchor}
              open={Boolean(customerMenuAnchor)}
              onClose={handleCustomerMenuClose}
            >
              <MenuItem onClick={handleCustomerSignUp}>Sign Up</MenuItem>
              <MenuItem onClick={handleCustomerSignIn}>Sign In</MenuItem>
            </Menu>
            <Button color="inherit" onClick={handleServiceButtonClick}>
              Service Provider
            </Button>
            <Menu
              anchorEl={serviceMenuAnchor}
              open={Boolean(serviceMenuAnchor)}
              onClose={handleServiceMenuClose}
            >
              <MenuItem onClick={handleServiceSignUp}>Sign Up</MenuItem>
              <MenuItem onClick={handleServiceSignIn}>Sign In</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Button color="inherit" onClick={handleCustomerButtonClick}>
              Customer
            </Button>
            <Button color="inherit" onClick={handleServiceButtonClick}>
              Service Provider
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <main className="main-content">
        <Box sx={{ padding: { xs: '20px', md: '50px' }, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to ServiceWala App
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', marginBottom: '30px' }}>
            ServiceWala App is your one-stop solution for finding the best service providers within your area in
            real time. Whether you need a Kabadiwala, Sabziwala, Harekmalwala, or any other service, we've got you
            covered. Simply sign up or sign in as a customer or service provider to get started.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box className="item" sx={{ textAlign: 'center' }}>
                <img src={kabbadiwala} alt="Item 1" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                <Typography variant="h5" gutterBottom>
                  Kabadi Wala
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="item" sx={{ textAlign: 'center' }}>
                <img src={sabjiwala} alt="Item 2" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                <Typography variant="h5" gutterBottom>
                  Sabzi Wala
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="item" sx={{ textAlign: 'center' }}>
                <img src={hawker} alt="Item 3" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                <Typography variant="h5" gutterBottom>
                  Harekmal Wala
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
    </Box>
  );
};

export default LandingPage;