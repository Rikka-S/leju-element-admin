import request from '@/api/request'

function findOrdersByPageApi(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
function findReturnApplyApi(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: 'post',
    data
  })
}

function orderDetailApi(id) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${id}`
  })
}
function orderReturnApi(id) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`
  })
}
function sendDoneApi(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: 'post',
    data
  })
}
function agreeApplyApi(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: 'post',
    data
  })
}
function rejectApplyApi(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
    method: 'post',
    data
  })
}
function receiveProductApi(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
    method: 'post',
    data
  })
}
function finishOrderApi(id) {
  return request({
    url: `/lejuAdmin/order/finishOrder/${id}`,
    method: 'post'
  })
}
function receiveProductsForceApi(id) {
  return request({
    url: `/lejuAdmin/order/receiveProductsForce/${id}`,
    method: 'post'
  })
}
export default {
  findOrdersByPageApi,
  findReturnApplyApi,
  orderDetailApi,
  orderReturnApi,
  agreeApplyApi,
  rejectApplyApi,
  receiveProductApi,
  finishOrderApi,
  sendDoneApi,
  receiveProductsForceApi
}
