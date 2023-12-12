import React, { useState } from 'react';
import { Modal, Typography, Button } from '@mui/material';
import DeleteConfirmation from './DeleteConfirmation'; // Import the new component
import './styles.css';

const DeleteContact = ({ contact, isOpen, onClose, id, onDelete }) => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  if (!contact) {
    return null;
  }

  const handleDelete = () => {
    setConfirmationOpen(true);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <div className='modal-container'>
          <Typography variant='h6'> Delete Contact Details </Typography>
          <Typography>ID: {id}</Typography>
          <Typography>Full Name: {contact?.fullName}</Typography>
          <Typography>Email: {contact?.emailAddress}</Typography>
          <Typography>Contact Number: {contact?.contactNumber}</Typography>
          <Typography>Location: {contact?.location}</Typography>
          <Typography>Registered Date: {contact?.registeredDate}</Typography>

          <Button onClick={onClose} color="primary">
            Back
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </div>
      </Modal>

      <DeleteConfirmation
        isOpen={isConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onDelete={() => {
          onDelete();
          onClose();
          setConfirmationOpen(false);
        }}
      />
    </>
  );
};

export default DeleteContact;