import React, { useState } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({name: newName.trim(), phone: newPhone.trim()}))
      setNewName('')      
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearchTerm(event.target.value)
  }

  const searchTerm = newSearchTerm.trim().toLowerCase()
  const personsToShow = searchTerm.length === 0
    ? persons
    : persons.filter(person => person.name.trim().toLowerCase().includes(newSearchTerm))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={newSearchTerm} searchHandler={handleSearch} />
      
      <h3>Add a new</h3>
      <PersonForm 
        submitHandler={addNewName} 
        name={newName} 
        nameHandler={handleNameChange} 
        phone={newPhone}
        phoneHandler={handlePhoneChange} />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
      
    </div>
  )
}

export default App