import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';
import {GoogleLogin} from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';



import { Visibility, VisibilityOff } from '@mui/icons-material';


import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [usernameState, setUsernameState] = useState();
  const [passwordState, setPasswordState] = useState();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async () => {
    try{
      let res = await axios.post("http://localhost:8000/login", values)
      if(res.data==="wrong username"){
        setUsernameState("wrong");
        setPasswordState("");
        return;
      }else if(res.data==="wrong password"){
        setUsernameState("");
        setPasswordState("wrong");
        return;
      }else{
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.username));
        navigate("/profile");
      }
    }catch(err){
      console.log(err);
    }
  }

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      // dispatch({ type: AUTH, data: { result, token } });

      // history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');
  
  useEffect(() => {
    // console.log(values);
  });

  const validateFields = ()=>{
    for(let value in values){
      if(values[value]===""){
        return true;
      }
    }
    return false;
  }

  return (
    <div>
      <Box
        sx={{
          width: 400,
          height: 600,
          backgroundColor: 'white',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 20,
          borderRadius: '25px',
          boxShadow: 5,
          '&:hover': {
            boxShadow: 24,
          },
          padding: 4

        }}
      >
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          Login
        </Typography>

        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="normal"
          onChange={handleChange('username')}
          helperText={usernameState==="wrong" ? "This username does not exist!" : ""}
          error={(usernameState==="wrong") ? true : false}
          sx={{ width: 300 }}
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          margin="normal"
          onChange={handleChange('password')}
          type={showPassword ? 'text' : 'password'}
          helperText={passwordState==="wrong" ? "Incorrect Password!" : ""}
          error={(passwordState==="wrong") ? true : false}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }}
          sx={{ width: 300 }}
        />
        <br></br>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{marginTop:5, marginBottom:5}}
          disabled={validateFields()?true:false}
        >
          Login
        </Button>
        <br/>
        <GoogleLogin
            clientId="236374376846-rjs664fki0dsr13hk6hlkv7o80hn0osk.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className="googleButton" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon/>} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

      </Box>
    </div>
  );
}

export default Login;