import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>the app is used by pressing the buttons</div>
    )
  }

  return (
    <div>button press history: {props.allClicks.join(' ')}</div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const First = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }


  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

const Second = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => 
    setClicks({...clicks, left: clicks.left + 1})

  const handleRightClick = () => 
    setClicks({...clicks, right: clicks.right + 1})
  
    return (
      <div>
        <div>
          {clicks.left}
          <button onClick={handleLeftClick}>left</button>
          <button onClick={handleRightClick}>right</button>
          {clicks.right}
        </div>
      </div>
    )
}

const App = () => {
  return (
    <div>
      <First />
      <br />
      <Second />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

