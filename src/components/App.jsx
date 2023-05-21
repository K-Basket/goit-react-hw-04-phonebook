import React, { useEffect } from 'react';
import { useState } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const getContacts = JSON.parse(localStorage.getItem('contacts'));

    if (getContacts) setContacts(getContacts);
  }, []);

  useEffect(() => {
    if (name && number) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      console.log('Hi');
    }
  }, [contacts, name, number]);

  function formSubmitHandler(name, number) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    if (
      contacts.some(el => el.name.toLowerCase() === normalizedName) ||
      contacts.some(el => el.number.toLowerCase() === normalizedNumber)
    ) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prev => [...prev, newContact]);
    setName(name);
    setNumber(number);
  }

  function changeFilter(evt) {
    setFilter(evt.currentTarget.value);
  }

  function getFiltered() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  }

  function deleteContact(contactId) {
    setContacts(prev => prev.filter(el => el.id !== contactId));
  }

  return (
    <>
      <h1>Phonebook</h1>
      <p>React Hooks</p>
      <ContactForm onSubmitData={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={getFiltered()} onDeleteContact={deleteContact} />
    </>
  );
}
