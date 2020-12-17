import request from '@/api/request'

function findUsersByPageApi(start, limit, data) {
  return request({
    url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
function findAllRolesApi() {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`,
    method: 'get'
  })
}
function removeUserApi(id) {
  return request({
    url: `/admin/sysAuth/user/removeUser/${id}`,
    method: 'delete'
  })
}
function updateUserRolesApi(data) {
  return request({
    url: `/admin/sysAuth/user/updateUserRoles`,
    method: 'put',
    data
  })
}
function saveUserRolesApi(data) {
  return request({
    url: `/admin/sysAuth/user/saveUserRoles`,
    method: 'post',
    data
  })
}
export default {
  findUsersByPageApi,
  findAllRolesApi,
  removeUserApi,
  updateUserRolesApi,
  saveUserRolesApi
}
