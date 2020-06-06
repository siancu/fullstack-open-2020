import React, { useState } from 'react';

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
      <div>
        filter shown with 
        <input value={newSearchTerm} onChange={handleSearch} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <br />

      <table>
        <tbody>
          {personsToShow.map(person => {
            return (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.phone}</td>
              </tr>
          )})}
        </tbody>
        </table>
    </div>
  )
}

export default App