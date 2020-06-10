//存储token
export function setToken(token){
  localStorage.setItem("userId",JSON.stringify(token))
}
//更新头像
export function updateToken(newHeadImg){
  const token = getToken()
  token.headImg = newHeadImg
  removeToken()
  setToken(token)
}
//获取token
export function getToken(){
  return JSON.parse(localStorage.getItem('userId') || '{}')
}
//删除token
export function removeToken(){
  localStorage.removeItem('userId')
}