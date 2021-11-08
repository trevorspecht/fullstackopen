import React, { useEffect, useState } from 'react'
import personsService from './services/persons'

const Person = ({ person, persons, setPersons }) => {

  const removePerson = (person) => {
    console.log(person)
    const idToRemove = person.id
    
    if (window.confirm(`are you sure you want to delete ${person.name}?`)) {
      personsService
      .remove(idToRemove)
      .then(response => {
        console.log('response', response)
        setPersons(persons.filter(person => person.id !== idToRemove))
      })
      .catch(error => console.log(error.response))
    }
  }

  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => removePerson(person)}>delete</button>
    </p>
  )
}

const PersonList = ({ persons, setPersons }) => {
  return (
    <>
      {persons.map(person => 
        <Person key={person.id} person={person} persons={persons} setPersons={setPersons} />
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
      id: Date.now(),
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => console.log(error.response))
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
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('error getting phonebook', error)
      })
  }, [])

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
      <PersonList persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App