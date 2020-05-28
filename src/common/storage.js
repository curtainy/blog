//存储token
export function setToken(token){
  localStorage.setItem("userId",JSON.stringify(token))
}
//获取token
export function getToken(){
  return JSON.parse(localStorage.getItem() || '{}')
}
//删除token
export function removeToken(){
  localStorage.removeItem()
}