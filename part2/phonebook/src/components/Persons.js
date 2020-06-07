import React from 'react'
import Person from './Person'

const Persons = ({ persons, deleteHandler }) => {
    return (
        <table>
            <tbody>
            {persons.map(person => <Person key={person.name} person={person} deleteHandler={() => deleteHandler(person.id)}/>)}
            </tbody>
        </table>
    )
}

export default Persons
