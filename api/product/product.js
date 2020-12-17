import request from '@/api/request'

function addProductAndSkusApi(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data
  })
}
function productSkusDetailApi(id) {
  return request({
    url: `/lejuAdmin/product/productSkusDetail/${id}`,
    method: 'get'
  })
}
function delProductApi(id) {
  return request({
    url: `/lejuAdmin/product/del/${id}`,
    method: 'delete'
  })
}
function updateProductAndSkusApi(data) {
  return request({
    url: `/lejuAdmin/product/updateProductAndSkus`,
    method: 'post',
    data
  })
}
function getSkusByProductIdApi(id) {
  return request({
    url: `lejuAdmin/sku/getSkusByProductId/${id}`,
    method: 'get'
  })
}
function updateSkuInfoApi(data) {
  return request({
    url: `/lejuAdmin/sku/updateSkuInfo`,
    method: 'post',
    data
  })
}
function addProductSkusApi(data) {
  return request({
    url: `/lejuAdmin/sku/addProductSkus`,
    method: 'post',
    data
  })
}
function delSkuApi(id) {
  return request({
    url: `/lejuAdmin/sku/delSku/${id}`,
    method: 'delete'
  })
}

export default {
  addProductAndSkusApi,
  productSkusDetailApi,
  delProductApi,
  updateProductAndSkusApi,
  getSkusByProductIdApi,
  updateSkuInfoApi,
  addProductSkusApi,
  delSkuApi
}
