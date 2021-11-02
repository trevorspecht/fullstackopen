import React, { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  let personsList = persons.map((person, index) => {
    let keyObj = {key: index, name: person.name, number: person.number}
    return keyObj
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    if (persons.find(person => {
      return person.name === event.target.value
    })) 
      window.alert(`${newName} is already added to the phonebook`)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      key: personsList.length,
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange} /></p>
          <p>number: <input value={newNumber} onChange={handleNumberChange} /></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsList.map(person => 
        <Person key={person.key} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

export default App