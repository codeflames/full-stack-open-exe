import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')



  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    if (checkIfNameAndNumberDoNotMatch(newName, newNumber)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personsService.update(changedPerson.id, changedPerson).then(
          returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            return
          }
        )
      }
    }
    else if (checkIfNameExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personsService.create(personObject).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    }
    // setPersons(persons.concat(personObject))
  }

  const deletePerson = (id) => {
    console.log(id)
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.deletePerson(id).then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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

  const checkIfNameAndNumberDoNotMatch = (name, number) => {
    return persons.some(person =>
      person.name === name && person.number !== number
    )
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
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

    </div>

  )
}

export default App