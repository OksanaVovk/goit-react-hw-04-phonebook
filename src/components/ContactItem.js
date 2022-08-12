import React from 'react';

const ContactItem = ({ id, name, number, onDeleteCon }) => (
  <li key={id}>
    <div className="item_cont">
      {name}:<span>{number}</span>
      <button onClick={() => onDeleteCon(id)}>Delete</button>
    </div>
  </li>
);

export default ContactItem;
