import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  DialogContentText,
} from '@mui/material';
import Modal from '@mui/material/Modal'
import './styles.css'

const ViewContact = ({ contact, isOpen, onClose, id }) => {
  if(!contact){
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Contact Details</DialogTitle>
      {/* <div className='modal-container'> */}
      <DialogContent>
        <DialogContentText>
        {/* <Typography variant='h6'> Contact Details </Typography> */}
      <Typography>ID: {id}</Typography>
      <Typography>Full Name: {contact?.fullName}</Typography>
        <Typography>Email: {contact?.emailAddress}</Typography>
        <Typography>Contact Number: {contact?.contactNumber}</Typography>
        <Typography>Location: {contact?.location}</Typography>
        <Typography>Registered Date: {contact?.registeredDate}</Typography>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        </DialogActions>
    </Dialog>
  );
};

export default ViewContact;