import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [votes, setVotes] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setVotes(votes + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setVotes(votes + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setVotes(votes + 1)
  }

  const getAverage = () => {
    const totalScore = good - bad
    return totalScore / votes
  }

  const getPositive = () => {
    return (good / votes) * 100
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={handleClickGood}>good</button>
        <button onClick={handleClickNeutral}>neutral</button>
        <button onClick={handleClickBad}>bad</button>
      </div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {votes}</p>
      <p>average {getAverage()}</p>
      <p>postive {getPositive()}%</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)