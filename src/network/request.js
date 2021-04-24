import axios from 'axios'

export default function request(config) {
  const instance = axios.create( {
      // baseURL: 'https://www.fastmock.site/mock/b03460794da747d3960d88e7772f1d30/blog',
      baseURL: 'http://localhost:9001',
      timeout: 5000
  })

  instance.interceptors.response.use((res) => {
      return res.data
  },(err) => {
      console.log(err)
  })

  return instance(config)
}