import axios from 'axios'
const baseUrl = '/api/clubs'

const getClubs = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getClubMembers = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const create = async newObject => {
  
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default {
  getClubs,
  create,
  getClubMembers
}