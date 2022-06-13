import React, { useState } from 'react'

import { createRoot } from 'react-dom/client';

const Button = ({nombre, estado, usaEstado}) => {

  const handleClick = () => {
    usaEstado(estado+1)
  }

  return (<button onClick={handleClick}>{nombre}</button>)
}

const Statistic = ({nombre, valor}) => {
  return (<tr>
            <td>{nombre}</td> 
            <td>{valor}</td>
          </tr>)
}

const Statistics = ({good, neutral, bad}) =>{

  const getAverage = () => (good-bad)/3

  const getPositive = () => good/(good+neutral+bad)


  return (
    <table>
      <tbody>
        <Statistic nombre="good"valor={good}/>
        <Statistic nombre="neutral"valor={neutral}/>
        <Statistic nombre="bad"valor={bad}/>
        <Statistic nombre="all"valor={good+neutral+bad}/>
        <Statistic nombre="average"valor={getAverage()}/>
        <Statistic nombre="positive"valor={getPositive() + " %"}/>
      </tbody>
    </table>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button nombre="good" estado={good} usaEstado={setGood} />
        <Button nombre="neutral" estado={neutral} usaEstado={setNeutral} />
        <Button nombre="bad" estado={bad} usaEstado={setBad} />
      </div>
      <h1>statistics</h1>
      {
        (good+neutral+bad)===0 
        ? <p>No feedback given</p> 
        : <Statistics good={good} neutral={neutral} bad={bad} />
      }
      
    </div>
  )
}

const container =  document.getElementById('root')
const root = createRoot(container)
root.render(<App />)