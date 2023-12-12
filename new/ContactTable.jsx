// ContactTable.jsx
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
} from '@mui/material';
import ViewContact from './ViewContact';
import DeleteContact from './DeleteContact';
import UpdateContact from './UpdateContact';
import { v4 as uuidv4 } from 'uuid';
import DeleteConfirmation from './DeleteConfirmation';
import ContactForm from './ContactForm';

const ContactTable = ({onUpdatedContact}) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [updateFormData, setUpdateFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    location: '',
    registeredDate: '',
  });

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  // const handleUpdateConfirm = (updatedContact) => {
  //   const updatedContacts = contacts.map((c) =>
  //     c.id === selectedContact.id ? { ...c, ...updatedContact } : c
  //   );
  //   setContacts(updatedContacts);
  //   saveContactsToLocalStorage(updatedContacts);
  
  //   setSelectedContact(null);
  //   setUpdateDialogOpen(false);
  
  //   // Call the onUpdatedContact callback to update the parent component or perform additional actions
  //   onUpdatedContact(updatedContacts);
  // };

  const saveContactsToLocalStorage = (updatedContacts) => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };
  

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setViewDialogOpen(contact, contacts.indexOf(contact) + 1);
  };

  const handleOpenUpdateDialog = (contactId) => {
    const selectedContact = contacts.find((contact) => contact.id === contactId);
    setSelectedContact(selectedContact);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedContact(null);
  };

  const handleUpdateContact = (updatedContact) => {
    // Implement logic to update the contact in your contacts array or storage
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );

    setContacts(updatedContacts);

    // Update the contact in local storage
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  

  const handleDeleteContact = (contact) => {
    setSelectedContact(contact);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedContacts = contacts.filter((c) => c.id !== selectedContact.id);
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);

    setSelectedContact(null);
    setDeleteDialogOpen(false);
  };

  // const handleUpdateConfirm = (updatedContact) => {
  //   const updatedContacts = contacts.map((contacts) => 
  //   contacts.id === selectedContact.id ? {...contacts, ...updatedContact} : contacts);
  //   setContacts(updatedContacts);
  //   saveContactsToLocalStorage(updatedContacts);
  //   setSelectedContact(null);
  //   setDeleteDialogOpen(false);
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Registered Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : contacts
            ).map((contact, index) => (
              <TableRow key={contact.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{contact.fullName}</TableCell>
                <TableCell>{contact.emailAddress}</TableCell>
                <TableCell>{contact.contactNumber}</TableCell>
                <TableCell>{contact.location}</TableCell>
                <TableCell>{contact.registeredDate}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewContact(contact)}>View</Button>
                  <Button onClick={() => handleOpenUpdateDialog(contact.id)}>Update</Button>
                  <Button onClick={() => handleDeleteContact(contact)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ViewContact 
      contact={selectedContact} 
      isOpen={isViewDialogOpen} 
      onClose={() => setViewDialogOpen(false)} 
      id={contacts.indexOf(selectedContact) + 1} />


      <DeleteContact
        contact={selectedContact}
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={handleDeleteConfirm}
        id={contacts.indexOf(selectedContact) + 1}
      />

<UpdateContact
        contact={selectedContact}
        onUpdateContact={handleUpdateContact}
        onClose={handleCloseUpdateDialog}
        open={openUpdateDialog}
      />
    

    </div>
  );
};

export default ContactTable;