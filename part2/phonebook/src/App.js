import React, { useState } from 'react'

const Person = ({ name }) => {
  return (
    <p>{name}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')

  let personsList = persons.map((person, index) => {
    let keyObj = {key: index, name: person.name}
    return keyObj
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    if (persons.find(person => {
      return person.name === event.target.value
    })) 
      window.alert(`${newName} is already added to the phonebook`)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObj = {
      key: personsList.length,
      name: newName
    }

    setPersons(persons.concat(personObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsList.map(person => 
        <Person key={person.key} name={person.name}/>
      )}
    </div>
  )
}

export default App