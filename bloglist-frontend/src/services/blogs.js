import axios from 'axios'
const baseUrl = 'api/blogs'

let token = null

const setToken = newToken => {
    console.log("service set token")
    token = `bearer ${newToken}`
}

const getAll = async () => {
  console.log("getall")
  const config = {
    headers: { Authorization: token },
  }
  console.log("config: ", config);
  const request = await axios.get(baseUrl, config)
  return request.data
}

const create = async newObject => {
  console.log("servicepost")
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject,config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
