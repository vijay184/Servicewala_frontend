import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import emailjs from 'emailjs-com';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ServiceWala.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function ServiceRegister() {
  let [occupation, setOccupation] = React.useState('');
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [mobile_number, setMobile_number] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const navigate = useNavigate();
  
  const typeOccupationMap = {
    'KabbariWala': 0,
    'SabjiWala': 1,
    'Hawkers': 2,
};

const generateSixDigitRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const randomSixDigitNumber = generateSixDigitRandomNumber();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const targetParams = {
      name: name,
      email: email,
      random: randomSixDigitNumber
    }

    emailjs.send("service_ycbi8ov", "template_g05kiv8", targetParams, "BxTxo7tLC5KeFqHoi")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      }
      )
    occupation = typeOccupationMap[occupation];
    navigate('/otp_verify1', { state: { name, email, password, mobile_number,occupation, address, image, randomSixDigitNumber } });
  };

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
             Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="Name"
                  onChange={(e)=>setName(e.target.value)}
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e)=>setEmail(e.target.value)}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mob_number"
                  onChange={(e)=>setMobile_number(e.target.value)}
                  label="Mob_number"
                  type="number"
                  id="mob_number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  onChange={(e)=>setAddress(e.target.value)}
                  id="address"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="occupation">Occupation</InputLabel>
                  <Select
                    value={occupation}
                    onChange={handleOccupationChange}
                    label="Occupation"
                    inputProps={{
                      name: 'occupation',
                      id: 'occupation',
                    }}
                  >
                    <MenuItem value="">Select an option</MenuItem>
                    <MenuItem value="KabbariWala">KabbariWala</MenuItem>
                    <MenuItem value="SabjiWala">SabjiWala</MenuItem>
                    <MenuItem value="Hawkers">Hawkers</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="image"
                  type="text"
                  onChange={(e)=>setImage(e.target.value)}
                  required
                  fullWidth
                  id="image"
                  label="image"
                  autoFocus
                />
              </Grid>


        
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/service_login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
