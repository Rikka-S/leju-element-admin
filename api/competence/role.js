import request from '@/api/request'

function findAllPermissionsApi() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
    method: 'get'
  })
}
function findRolesByPageApi(start, limit) {
  return request({
    url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`,
    method: 'get'
  })
}
function roleApi(id) {
  return request({
    url: `/admin/sysAuth/role/${id}`,
    method: 'get'
  })
}
function saveRolePermissionsApi(data) {
  return request({
    url: `/admin/sysAuth/role/saveRolePermissions`,
    method: 'post',
    data
  })
}
function updateRolePermissionsApi(data) {
  return request({
    url: `/admin/sysAuth/role/updateRolePermissions`,
    method: 'put',
    data
  })
}
function removeRoleApi(id) {
  return request({
    url: `/admin/sysAuth/role/removeRole/${id}`,
    method: 'delete'
  })
}

export default {
  findAllPermissionsApi,
  findRolesByPageApi,
  saveRolePermissionsApi,
  updateRolePermissionsApi,
  removeRoleApi,
  roleApi
}
