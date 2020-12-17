const wls = window.localStorage

export function setToken(val) {
  wls.setItem('token', val)
}
export function getToken() {
  return wls.getItem('token')
}
export function removeToken() {
  wls.removeItem('token')
}
export function setUserInfo(val) {
  val = JSON.stringify(val)
  wls.setItem('userInfo', val)
}
export function getUserInfo() {
  var obj = JSON.parse(wls.getItem('userInfo'))
  return obj
}
export function removeUserInfo() {
  wls.removeItem('userInfo')
}
export function clearAll() {
  removeUserInfo()
  removeToken()
}
