import {useState } from 'react'
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';

function EditBio(props) {

  
  const handleClose=props.close;
  
  return (
    <div >
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Edit Bio</DialogTitle>
        <DialogContent>
          

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditBio;