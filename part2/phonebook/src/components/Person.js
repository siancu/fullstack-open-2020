import React from 'react'

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.phone}</td>
        </tr>
    )
}

export default Person