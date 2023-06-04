
const Persons = ({ personsToShow, deletePerson }) => {
  return (
    personsToShow.map((person) => {
      return <div key={person.id}>{person.name} {person.number}  <button onClick={() => deletePerson(person.id)}>delete</button></div>
    })

  )
}

export default Persons