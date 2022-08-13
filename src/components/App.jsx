import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useEffect } from 'react';
const LS_Key = 'contacts_hook';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(LS_Key))
      ? JSON.parse(window.localStorage.getItem(LS_Key))
      : []
  );
  const [filter, setFilter] = useState('');

  let filtId = nanoid();

  useEffect(() => {
    window.localStorage.setItem(LS_Key, JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = event => {
    return setFilter(event.currentTarget.value);
  };

  const onFormSubmit = data => {
    const isRepead = contacts.some(contact =>
      contact.name.toLowerCase().includes(data.name.toLowerCase())
    );
    isRepead
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevState => [{ id: nanoid(), ...data }, ...prevState]);
  };

  const getVisiableContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteCont = contId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contId)
    );
  };

  const visiableContacts = getVisiableContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} />
      <h2>Contacts</h2>
      <Filter id={filtId} value={filter} onChange={handleFilterChange} />
      <ContactList contactArray={visiableContacts} onDeleteCont={deleteCont} />
    </div>
  );
}
