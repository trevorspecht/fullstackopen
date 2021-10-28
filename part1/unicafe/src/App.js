import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodCounter = () => setGood(good + 1)
  const neutralCounter = () => setNeutral(neutral + 1)
  const badCounter = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = all / 3
  const positive = (good / all) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodCounter} text='good' />
      <Button handleClick={neutralCounter} text='neutral' />
      <Button handleClick={badCounter} text='bad' />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p> 
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

export default App