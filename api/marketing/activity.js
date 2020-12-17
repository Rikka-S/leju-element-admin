import request from '@/api/request'

function findAllRecommendsApi() {
  return request({
    url: `/lejuAdmin/homeRecommend/findAllRecommends`
  })
}
function delRecommendApi(id) {
  return request({
    url: `/lejuAdmin/homeRecommend/delRecommend/${id}`,
    method: 'delete'
  })
}
function findAllBrandApi(id) {
  return request({
    url: `/lejuAdmin/brand/findAllBrand`
  })
}
function productsByPageApi(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
export default {
  findAllRecommendsApi,
  delRecommendApi,
  findAllBrandApi,
  productsByPageApi
}
