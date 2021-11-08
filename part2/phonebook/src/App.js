import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const PersonList = ({ persons }) => {
  return (
    <>
      {persons.map(person => 
        <Person key={person.id} name={person.name} number={person.number}/>
      )}
    </>
  )
}

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

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
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    axios
      .post('http://localhost:3001/persons', personObj)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <form onSubmit={addPerson}>
    <div>
      <p>name: <input value={newName} onChange={handleNameChange} /></p>
      <p>number: <input value={newNumber} onChange={handleNumberChange} /></p>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = ({ persons, setPersons, search, setSearch }) => {

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
    let personsList = persons.filter(person => 
      person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    setPersons(personsList)
  }

  return (
    <p>filter shown with <input search={search} onChange={handleSearch} /></p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  // let personsList = persons.map((person, index) => {
  //   let keyObj = {key: index, name: person.name, number: person.number}
  //   return keyObj
  // })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} search={search} setSearch={setSearch} />
      <h3>add a new</h3>
      <PersonForm 
        persons={persons} setPersons={setPersons} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <PersonList persons={persons} />
    </div>
  )
}

export default App