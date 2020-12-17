import request from '@/api/request'

function findArticles(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}
function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'post',
    data
  })
}
function addArticleApi(data) {
  return request({
    url: `/lejuAdmin/productArticle/addArticle`,
    method: 'post',
    data
  })
}
function updateArticleApi(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data
  })
}
function productArticleApi(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`
  })
}
function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete'
  })
}
export default {
  findArticles,
  changeShowStatus,
  delArticle,
  addArticleApi,
  productArticleApi,
  updateArticleApi
}
