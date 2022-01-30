import { useEffect, useState } from 'react'
import axios from 'axios';
import EditBio from './editBio';
import EditIcon from '@mui/icons-material/Edit';

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Avatar
} from '@mui/material';

function Profile() {

  const [values, setValues] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);

   const authHeader=()=> {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get("http://localhost:8000/profile", { headers: authHeader() })
        console.log(res.data);
        setValues(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

  },[]);

  const handleClickOpen = () => {
    setDialogOpen(true);
    console.log(dialogOpen)
  };

  const handleClose = () => {
    setDialogOpen(false);
    console.log("clicked");
    console.log(dialogOpen);
  };


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
          padding: 4,
          display:"flex",
          flexDirection:"column",
          alignContent:"center",
          alignItems:"center",

        }}
        
      >
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          My Profile
        </Typography>

        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          {values.username}
        </Typography>
        

        <Box
        sx={{
          backgroundColor: '#F0F8FF',
          // marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '25px',
          boxShadow: 2,
          padding: 3,
          display:"flex",
          flexDirection:"column",
          alignContent:"center",
          alignItems:"center",
          width:'350px',

        }}
        >
          <Typography variant="body1" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            {values.bio}
          </Typography>

          <IconButton
            aria-label="edit bio"
            onClick={handleClickOpen}
            edge="end"
            sx={{
              alignSelf:'flex-end',
            }}
          >
            { <EditIcon />}
          </IconButton>

        </Box>

      </Box>
      <EditBio open={dialogOpen} close={handleClose}></EditBio>

    </div>
  );

}

export default Profile;