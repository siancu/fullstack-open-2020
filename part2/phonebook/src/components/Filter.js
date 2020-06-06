import React from 'react';

const Filter = (props) => {
    const { searchTerm, searchHandler } = props

    return (
        <div>
        filter shown with 
        <input value={searchTerm} onChange={searchHandler} />
      </div>
    )
}

export default Filter