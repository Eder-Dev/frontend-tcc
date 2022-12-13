import axios from 'axios'

const api = axios.create({
  baseURL: 'https://backendagendatcc.herokuapp.com'
})

export default api
