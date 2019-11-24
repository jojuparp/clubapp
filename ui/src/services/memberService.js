import axios from 'axios'
const baseUrl = '/api/members'

const getMembers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  
  const response = await axios.post(baseUrl, newObject)
  return response.data
}


export default {
  getMembers,
  create
}