
import React from 'react';
import { Modal, Typography, Button } from '@mui/material';
import './styles.css';

const DeleteConfirmation = ({ isOpen, onClose, onDelete }) => {
    const handleConfirmDelete = () => {
        onDelete();
        onClose();
    }
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className='modal-container'>
        <Typography variant='h6'> Confirm Deletion </Typography>
        <Typography>Are you sure you want to delete this contact?</Typography>

        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary">
          Confirm Delete
        </Button>
      </div>
    </Modal>
    
  );
};

export default DeleteConfirmation;