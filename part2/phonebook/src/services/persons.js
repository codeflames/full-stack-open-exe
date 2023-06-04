import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAll = async() => {
  const request = axios.get(baseUrl);
 return request.then(
    response => response.data
  ).catch(
    error => {
      console.log("error", error)
      alert("The server is not running")
    }
  )
}

const create = async(newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch(
    error => {
      console.log("error", error)
      alert("The person you are trying to add already exists in the server")
    }
  )
}

const update = async(id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject )
  return request.then(response => response.data).catch(
    error => {
      console.log("error", error)
      alert("The person you are trying to update has already been deleted from the server")
    }
  )
}

const deletePerson = async(id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data).catch(
    error => {
      console.log("error", error)
      alert("The person you are trying to delete has already been deleted from the server")
    }
  )
}

const personsService = { getAll, create, update, deletePerson }

export default personsService