import { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  
  useEffect( () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log("promise fulfilled")
      setPersons(response.data)
    })
  }, [])

  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    if (checkIfNameExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === '' ? persons : persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  const checkIfNameExists = (name) => {
    return persons.some(person => person.name === name)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
     <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
     

    </div>

  )
}

export default App