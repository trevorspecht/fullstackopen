import React, { useEffect, useState } from 'react'
import personsService from './services/persons'

const Person = ({ person, persons, setPersons, setFiltered, setNotification }) => {

  const removePerson = (person) => {
    const idToRemove = person.id

    if (window.confirm(`are you sure you want to delete ${person.name}?`)) {
      personsService
        .remove(idToRemove)
        .then(response => {
          console.log('response', response)
          setFiltered(persons.filter(person => person.id !== idToRemove))
          setPersons(persons.filter(person => person.id !== idToRemove))
        })
        .catch(error => {
          console.log(error.response)
          if (error.response.status === 404) {
            setNotification({ text: `${person.name} has already been removed from the phonebook`, error: true })
            setFiltered(persons.filter(person => person.id !== idToRemove))
            setPersons(persons.filter(person => person.id !== idToRemove))
          }
        else 
          setNotification({ text: `error removing ${person.name}`, error: true})
        setTimeout(() => {
          setNotification({ text: null, error: false })
        }, 5000)
        })
    }
  }

  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => removePerson(person)}>delete</button>
    </p>
  )
}

const PersonList = ({ filtered, setFiltered, persons, setPersons, setNotification }) => {
  return (
    <>
      {filtered.map(person => 
        <Person key={person.id} person={person} persons={persons} setPersons={setPersons} setFiltered={setFiltered} setNotification={setNotification} />
      )}
    </>
  )
}

const PersonForm = ({ persons, setPersons, setFiltered, newName, setNewName, newNumber, setNewNumber, setNotification }) => {

  const handleNameChange = (event) => {
    const value = event.target.value
    setNewName(value)
  }

  const handleNumberChange = (event) => {
    const value = event.target.value
    setNewNumber(value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    let foundPerson = persons.filter(person => person.name === newName)

    if (foundPerson.length > 0) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        foundPerson[0].number = newNumber

        personsService
          .update(foundPerson[0])
          .then(response => {
            setFiltered(persons.map(person => {
              if (person.id === response.id) return response
              else return person
            }))
            setNotification({ text: `${newName} has had their number changed`, error: false })
            setTimeout(() => {
              setNotification({ text: null, error: false })
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error.response)
            if (error.response.status === 404) {
              setNotification({ text: `${newName} has already been removed from the phonebook`, error: true })
              setFiltered(persons.filter(person => person.id !== foundPerson[0].id))
              setPersons(persons.filter(person => person.id !== foundPerson[0].id))
            } else {
              setNotification({ text: `error changing number for ${newName}`, error: true})
            }

            setTimeout(() => {
              setNotification({ text: null, error: false })
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObj = {
        id: Date.now(),
        name: newName,
        number: newNumber
      }

      personsService
        .create(personObj)
        .then(returnedPerson => {
          setFiltered(persons.concat(returnedPerson))
          setPersons(persons.concat(returnedPerson))
          setNotification({ text: `added ${newName} to the phonebook`, error: false})
          setTimeout(() => {
            setNotification({ text: null, error: false })
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response)
          setNotification({ text: `error adding ${newName} to the phonebook`, error: true})
          setTimeout(() => {
            setNotification({ text: null, error: false })
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
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

const Filter = ({ persons, setFiltered, search, setSearch }) => {

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
    setFiltered(persons.filter(person => 
      person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1))
  }

  return (
    <p>filter shown with <input search={search} onChange={handleSearch} /></p>
  )
}

const Notification = ({ notification }) => {
  const color = notification.error ? 'red' : 'green'
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    fontSize: 20
  }

  if (notification.text === null) return null
  else return (
    <div style={notificationStyle}>
      {notification.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({ text: null, error: false })

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFiltered(initialPersons)
      })
      .catch(error => {
        console.log('error getting phonebook', error)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter persons={persons} setFiltered={setFiltered} search={search} setSearch={setSearch} />
      <h3>add a new</h3>
      <PersonForm 
        persons={persons} setPersons = {setPersons}
        filtered={filtered} setFiltered={setFiltered}
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber} 
        setNotification={setNotification}
      />
      <h3>Numbers</h3>
      <PersonList filtered={filtered} setFiltered={setFiltered} persons={persons} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )
}

export default App