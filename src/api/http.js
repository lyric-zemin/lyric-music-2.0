import axios from 'axios'
import { BASE_URL, ERR_OK } from './config'

export default function http({ url, method = 'GET', data = {} }) {
  return axios({
    method,
    url: BASE_URL + url,
    data
  }).then(res => {
    if (res.data.response.code === ERR_OK) {
      return res.data.response
    }
  })
}