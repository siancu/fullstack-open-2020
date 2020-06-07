import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')

  useEffect(() => {
    phonebookService.getAll()
      .then(phonebookEntries => setPersons(phonebookEntries))
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = {name: newName.trim(), number: newNumber.trim()}
      phonebookService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
        number={newNumber}
        numberHandler={handleNumberChange} />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
      
    </div>
  )
}

export default App
