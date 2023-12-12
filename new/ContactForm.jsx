import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';


const ContactForm = ({ onAddContact, lastContactId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    location: '',
    registeredDate: '',
  });
  const [errors, setErrors] = useState({});
  // const [refresh, setRefresh] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error message when the user types
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const formatFullName = () => {
    const { fullName } = formData;
    const names = fullName.split(' ');
    if (names.length === 1) {
      return names[0];
    } else if (names.length === 2) {
      return `${names[1]}, ${names[0]}`;
    } else {
      return `${names[names.length - 1]}, ${names[0]} ${names
        .slice(1, -1)
        .map((middle) => middle.charAt(0))
        .join(' ')}.`;
    }
  };
  const handleAddContact = () => {
    const isValid = validateForm();
  
    if (isValid) {
      const contactIdCounter = parseInt(localStorage.getItem('contactIdCounter')) || 0;
      const newContact = {
        id: contactIdCounter + 1,
        ...formData,
        fullName: formatFullName(),
      };
  
      // Save updated contactIdCounter to local storage
      localStorage.setItem('contactIdCounter', newContact.id);
  
      // Save new contact to local storage
      const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      const updatedContacts = [...storedContacts, newContact];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));

      console
  
      onAddContact(updatedContacts);
      setFormData({
        fullName: '',
        emailAddress: '',
        contactNumber: '',
        location: '',
        registeredDate: '',

        
      });
      window.location.reload();
     
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation for Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name field cannot be blank';
    } else if (!/^[a-zA-Z\s']+$/.test(formData.fullName)) {
      newErrors.fullName = 'Full Name field accepts characters values only';
    } else if (formData.fullName.length > 30) {
      newErrors.fullName = 'Full Name field accepts up to 30 characters only';
    }

    // Validation for Email Address
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email Address field cannot be blank';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Invalid Email Address format';
    } else if (formData.emailAddress.length > 45) {
      newErrors.emailAddress =
        'Email Address field accepts up to 45 characters only';
    }

    // Validation for Contact Number
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number field cannot be blank';
    } else if (!/^\d+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number field accepts numeric values only';
    } else if (formData.contactNumber.length !== 11) {
      newErrors.contactNumber =
        'Contact Number field accepts up to 11 digits only';
    }

    // Validation for Location
    if (!formData.location.trim()) {
      newErrors.location = 'Location field cannot be blank';
    }

    // Validation for Registered Date
    if (!formData.registeredDate.trim()) {
      newErrors.registeredDate = 'Registered Date field cannot be blank';
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.registeredDate);

    if (
      selectedDate.toString() === 'Invalid Date' ||
      selectedDate.toDateString() !== currentDate.toDateString()
    ) {
      newErrors.registeredDate = 'Registered Date must be the current date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const[, updateState] = useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  
  
  return (
    <div>
      <h2>Contact Form</h2>
      <form>
        <TextField
          label="Full Name"
          value={formData.fullName}
          variant='filled'
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName}
        />
        <TextField
          label="Email Address"
          value={formData.emailAddress}
          variant='filled'
          onChange={(e) => handleInputChange('emailAddress', e.target.value)}
          error={Boolean(errors.emailAddress)}
          helperText={errors.emailAddress}
        />
        <TextField
          label="Contact Number"
          value={formData.contactNumber}
          // variant='filled'
          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
          error={Boolean(errors.contactNumber)}
          helperText={errors.contactNumber}
        />
        <FormControl>
          <InputLabel style={{ color: 'gray', textSizeAdjust: 5 }}></InputLabel>
          <Select
            value={formData.location}
            variant='filled'
            onChange={(e) => handleInputChange('location', e.target.value)}
            error={Boolean(errors.location)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Location
            </MenuItem>
            <MenuItem value="Manila">Manila</MenuItem>
            <MenuItem value="Cebu">Cebu</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Registered Date"
          type="date"
          value={formData.registeredDate}
          variant='filled'
          onChange={(e) => handleInputChange('registeredDate', e.target.value)}
          error={Boolean(errors.registeredDate)}
          helperText={errors.registeredDate}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleAddContact}>
          Add Contact
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
