import { useEffect, useState } from 'react'
import axios from 'axios';
import EditBio from './editBio';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  Box,
  Typography,
  IconButton,
  Avatar,
  ImageList,
  ImageListItem,
  Divider,
} from '@mui/material';

import { useNavigate } from "react-router-dom";


function Profile() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const authHeader = () => {
    let token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      return {
        Authorization: 'Bearer ' + token,
        Type: JSON.parse(localStorage.getItem('type'))
      };
    } else {
      token = JSON.parse(sessionStorage.getItem('token'));
      if(token){
        return {
          Authorization: 'Bearer ' + token,
          Type: JSON.parse(sessionStorage.getItem('type'))
        };
      }else{
        return {};
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get("http://localhost:8000/profile", { headers: authHeader() })
        setValues(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async (newBio) => {
    setDialogOpen(false);
    setValues({ ...values, bio: newBio });
    await axios.post("http://localhost:8000/editbio", { bio: newBio }, { headers: authHeader() });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('type');
    handleCloseMenu();
    navigate("/login");
  };

  const handlePicture = async (e) => {

    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    console.log(base64);
    setValues({ ...values, profilePicture: base64 });

    await axios.post("http://localhost:8000/uploadpicture", { picture: base64 }, { headers: authHeader() });

    handleCloseMenu();
  };

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      cols: 2,
    },
  ];



  return (
    <div>
      <Box
        sx={{
          width: 500,
          height: 750,
          backgroundColor: 'white',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 5,
          borderRadius: '25px',
          boxShadow: 5,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",

        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '25px',
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            width: '450px',
            justifyContent: 'space-between'

          }}
        >
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            My Profile
          </Typography>

          <IconButton
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
              <MenuItem
                component="label"
              >
                Change Profile Picture
                <input
                  type="file"
                  onChange={handlePicture}
                  hidden
                />
              </MenuItem>
              <Divider />
            <MenuItem onClick={handleLogOut}>
              Log out
            </MenuItem>
          </Menu>

        </Box>

        <Avatar sx={{ width: 100, height: 100 }} alt="Remy Sharp" src={values.profilePicture} />

        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          {values.username}
        </Typography>


        <Box
          sx={{
            backgroundColor: '#CAE9F5',
            borderRadius: '25px',
            boxShadow: 2,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            width: '350px',
            marginBottom: 2

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
              alignSelf: 'flex-end',
            }}
          >
            {<EditIcon />}
          </IconButton>

        </Box>

        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '25px',
            padding: 1,
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            width: '350px',
            justifyContent: 'space-evenly'

          }}
        >
          <Box
            sx={{
              backgroundColor: '#CAE9F5',
              borderRadius: '5px',
              boxShadow: 2,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              width: 30,
            }}
          >
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Photos
              15
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#CAE9F5',
              borderRadius: '5px',
              boxShadow: 2,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              width: 30,
            }}
          >
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Followers
              758
            </Typography>

          </Box>

          <Box
            sx={{
              backgroundColor: '#CAE9F5',
              borderRadius: '5px',
              boxShadow: 2,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              width: 30,
            }}
          >
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Follows
              150
            </Typography>

          </Box>

        </Box>

        <ImageList
          sx={{ width: 500, height: 450, borderRadius: 5 }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

      </Box>
      <EditBio open={dialogOpen} close={handleClose} confirm={handleConfirm} oldBio={values.bio}></EditBio>



    </div>
  );

}

export default Profile;