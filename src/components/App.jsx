import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { Component } from 'react';
const LS_Key = 'contacts';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  filtId = nanoid();

  componentDidMount() {
    const contactInf = localStorage.getItem(LS_Key);
    const parsedCont = JSON.parse(contactInf);
    if (parsedCont) {
      this.setState({ contacts: parsedCont });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LS_Key, JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = event => {
    return this.setState({ filter: event.currentTarget.value });
  };

  onFormSubmit = data => {
    const isRepead = this.state.contacts.some(contact =>
      contact.name.toLowerCase().includes(data.name.toLowerCase())
    );
    isRepead
      ? alert(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [{ id: nanoid(), ...data }, ...prevState.contacts],
        }));
  };

  getVisiableContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteCont = contId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visiableContacts = this.getVisiableContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onFormSubmit} />
        <h2>Contacts</h2>
        <Filter
          id={this.filtId}
          value={filter}
          onChange={this.handleFilterChange}
        />
        <ContactList
          contactArray={visiableContacts}
          onDeleteCont={this.deleteCont}
        />
      </div>
    );
  }
}
