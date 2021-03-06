import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from "./components/Notification"
import phonebookService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebookService.getAll()
      .then(phonebookEntries => setPersons(phonebookEntries))
  }, [])

  const sendNotification = (message, typeOfNotification) => {
    setNotification({message, typeOfNotification})
    setTimeout(() => setNotification(null), 2000)
  }

  const addNewName = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    if (person) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = {...person, number: newNumber}
        phonebookService
          .update(person.id, newPerson)
          .then(returnedPerson => {
            sendNotification(`Changed the number for ${returnedPerson.name}`, 'success')
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
      }
    } else {
      const newPerson = {name: newName.trim(), number: newNumber.trim()}
      phonebookService.create(newPerson)
        .then(returnedPerson => {
          sendNotification(`Added ${returnedPerson.name}`, 'success')
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          sendNotification(error.response.data.error, 'error')
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

  const handleDelete = id => {
    const selectedPerson = persons.find(p => p.id === id)
    if (window.confirm(`delete ${selectedPerson.name} ?`)) {
      phonebookService.remove(id)
        .then(_ => {
          const newPersons = persons.filter(p => p.id !== id)
          setPersons(newPersons)
          sendNotification(`Person with name ${selectedPerson.name} was deleted`, 'success')
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          sendNotification(`Information of ${selectedPerson.name} has already been removed from server`, 'error')
        })
    }
  }

  const searchTerm = newSearchTerm.trim().toLowerCase()
  const personsToShow = searchTerm.length === 0
    ? persons
    : persons.filter(person => person.name.trim().toLowerCase().includes(newSearchTerm))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchTerm={newSearchTerm} searchHandler={handleSearch} />
      
      <h3>Add a new</h3>
      <PersonForm 
        submitHandler={addNewName} 
        name={newName} 
        nameHandler={handleNameChange} 
        number={newNumber}
        numberHandler={handleNumberChange} />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteHandler={handleDelete}/>
      
    </div>
  )
}

export default App
