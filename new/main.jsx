import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; 
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';


const Main = () => {
  const [contacts, setContacts] = useState([]);
  // const [contactIdCounter, setContactIdCounter] = useState(1);

 
  const handleAddContact = (newContact) => {
    setContacts(newContact);
  };

  return (
   

    <React.StrictMode>
      
        <div className="container">
        <div className="form-container">
        <ContactForm onAddContact={handleAddContact} />
        </div>
        <div className="table-container">
          <ContactTable contacts={contacts} />
        </div>
      </div>
     
    </React.StrictMode>

   

  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);