import React, { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  let personsList = persons.map((person, index) => {
    let keyObj = {key: index, name: person.name, number: person.number}
    return keyObj
  })

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
    personsList = persons.filter(person => 
      person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    setPersons(personsList)
  }

  const handleNameChange = (event) => {
    const value = event.target.value
    setNewName(value)
    if (persons.find(person => {
      return person.name === value
    })) 
      window.alert(`${newName} is already added to the phonebook`)
  }

  const handleNumberChange = (event) => {
    const value = event.target.value
    setNewNumber(value)
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
      <p>filter shown with <input search={search} onChange={handleSearch} /></p>
      <h2>add a new</h2>
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