import ContactItem from './ContactItem';
import React from 'react';

const ContactList = ({ contactArray, onDeleteCont }) => (
  <ul>
    {contactArray.map(contact => (
      <ContactItem
        id={contact.id}
        name={contact.name}
        number={contact.number}
        onDeleteCon={onDeleteCont}
      />
    ))}
  </ul>
);

export default ContactList;
