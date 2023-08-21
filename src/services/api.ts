import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://podcastr-json-server-api.vercel.app',
})
