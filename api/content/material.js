import request from '@/api/request'

function findMaterialByPageApi(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`
  })
}
function delMaterialApi(id) {
  return request({
    url: `/lejuAdmin/material/delMaterial/${id}`,
    method: 'delete'

  })
}
function uploadFileOssSaveApi() {
  return request({
    url: `/lejuAdmin/material/uploadFileOssSave`,
    method: 'post'
  })
}

export default {
  findMaterialByPageApi,
  delMaterialApi,
  uploadFileOssSaveApi
}
