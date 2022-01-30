import {useState } from 'react'
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';

function EditBio(props) {

  const [bio,setBio] = useState("");
  
  const handleClose=props.close;
  const handleConfirm=props.confirm;

  const handleChange = () => (event) => {
    setBio(event.target.value);
  };
  
  return (
    <div >
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Edit Bio</DialogTitle>
        <DialogContent>
        <TextField
          id="username"
          label="bio"
          defaultValue={props.oldBio}
          variant="outlined"
          margin="normal"
          onChange={handleChange()}
          sx={{ width: 300 }}
          multiline
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleConfirm(bio)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditBio;