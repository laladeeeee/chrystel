// UpdateContact.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
} from '@mui/material';
import './styles.css'

const UpdateContact = ({ contact, onUpdateContact, onClose, open }) => {
  const [updatedContact, setUpdatedContact] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    setUpdatedContact(contact);
  }, [contact]);

  const handleInputChange = (name, value) => {
    setUpdatedContact({
      ...updatedContact,
      [name]: value,
    });
  };

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleUpdateContact = () => {
    // Add validation or any other logic before updating
    handleCloseConfirmDialog(); // Close the confirmation dialog
    onUpdateContact(updatedContact);
    onClose();
  };

  return (
   
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Contact</DialogTitle>
      <DialogContent>
        {/* Full Name */}
        <TextField label="Full Name" value={updatedContact?.fullName || ''} disabled />

        {/* Email Address */}
        <TextField
          label="Email Address"
          value={updatedContact?.emailAddress || ''}
          onChange={(e) => handleInputChange('emailAddress', e.target.value)}
        />

        {/* Contact Number */}
        <TextField
          label="Contact Number"
          value={updatedContact?.contactNumber || ''}
          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
        />

        {/* Location */}
        <FormControl>
          <InputLabel>Select Location</InputLabel>
          <Select
            value={updatedContact?.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <MenuItem value="Manila">Manila</MenuItem>
            <MenuItem value="Cebu">Cebu</MenuItem>
          </Select>
        </FormControl>

        {/* Registered Date */}
        <TextField
          label="Registered Date"
          type="date"
          value={updatedContact?.registeredDate || ''}
          onChange={(e) => handleInputChange('registeredDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm the update to the following:
              <br />
              Email Address: {updatedContact?.emailAddress}
              <br />
              Contact Number: {updatedContact?.contactNumber}
              <br />
              Location: {updatedContact?.location}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              No
            </Button>
            <Button onClick={handleUpdateContact} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOpenConfirmDialog} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
    
  );
};

export default UpdateContact;