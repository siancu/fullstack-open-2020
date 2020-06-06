import React from 'react'

const PersonForm = (props) => {
    const { submitHandler, name, nameHandler, phone, phoneHandler } = props
    
    return (
        <form onSubmit={submitHandler}>
        <div>
          name: <input value={name} onChange={nameHandler} />
        </div>
        <div>
          phone: <input value={phone} onChange={phoneHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm