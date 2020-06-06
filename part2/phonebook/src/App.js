import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      phone: '1234-5678'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
          {persons.map(person => {
            return (
              <tr>
                <td key={person.name}>{person.name}</td>
                <td key={person.phone}>{person.phone}</td>
              </tr>
          )})}
        </tbody>
        </table>
    </div>
  )
}

export default App