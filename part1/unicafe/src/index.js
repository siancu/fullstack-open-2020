import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const getAverage = () => {
    const totalScore = good - bad
    return totalScore / getTotalVotes()
  }

  const getPositive = () => {
    return (good / getTotalVotes()) * 100
  }

  const getTotalVotes = () => {
    return good + neutral + bad
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
      
          <Statistic text="all" value={getTotalVotes()} />
          <Statistic text="average" value={getAverage()} />
          <Statistic text="postive" value={getPositive() + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  const { text, clickHandler } = props

  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text="good" clickHandler={() => setGood(good + 1)} />
        <Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
        <Button text="bad" clickHandler={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)