import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';


import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
  });

  const validateEmail = (email) => {
    if (email === "") return true;
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validateFields = ()=>{
    console.log(values)
    for(let value in values){
      console.log("I am true!"+value)
      if(values[value]===""){
        return true;
      }
    }

    if(!validateEmail(values['email'])) return true;

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
          Register
        </Typography>

        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="normal"
          onChange={handleChange('username')}
          sx={{ width: 300 }}
        />

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          margin="normal"
          onChange={handleChange('email')}
          helperText={!validateEmail(values.email) ? "Invalid Email" : ""}
          error={!validateEmail(values.email) ? true : false}
          sx={{ width: 300 }}
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          margin="normal"
          onChange={handleChange('password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }}
          sx={{ width: 300 }}
        />
        <br></br>
        <Button
          variant="outlined"
          onClick={async () => {
            try{
              await axios.post("http://localhost:8000/register", values);
            }catch(err){
              console.log(err);
            }
            navigate("/login");
          }}
          sx={{marginTop:10}}
          disabled={validateFields()?true:false}
        >

          Register
        </Button>


      </Box>
    </div>
  );
}

export default Register;