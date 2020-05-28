import axios from 'axios'

export default function(config){
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    }
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  return instance(config)
}