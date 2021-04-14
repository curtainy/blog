import axios from 'axios'

// export function request(config){
//   const instance = axios.create({
//     baseURL: 'http://localhost:3000',
//     timeout: 10000
//   })

//   //响应拦截
//   instance.interceptors.response.use(res => {
//     return res.data
//   },err => {
//     console.log(err)
//   })

//   return instance(config)
// }

export default function request(config) {
  const insatnce = axios.create( {
      baseURL: 'https://www.fastmock.site/mock/b03460794da747d3960d88e7772f1d30/blog',
      timeout: 5000
  })

  insatnce.interceptors.response.use((res) => {
      return res.data
  },(err) => {
      console.log(err)
  })

  return insatnce(config)
}