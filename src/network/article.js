import {
  request
} from "./request";
export function getArticlesData(pageNumber, pageSize, publishTimeYear, publishTimeMonth, publishTimeDay, searchQuery, sortBy) {
  return request({
    url: '/api/articles/all',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 10 : pageSize,
      publishTimeYear: publishTimeYear,
      publishTimeMonth: publishTimeMonth,
      publishTimeDay: publishTimeDay,
      searchQuery: searchQuery,
      sortBy: sortBy
    }
  })
}
export function getArticleData(articleId) {
  return request({
    url: '/api/articles/' + articleId
  })
}
export function addArticleData(data) {
  return request({
    method: 'post',
    url: '/api/articles/',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}
export function deleteArticleData(articleId) {
  return request({
    method: 'delete',
    url: '/api/articles/' + articleId
  })
}

export function updataArticleData(articleId, data) {
  return request({
    method: 'patch',
    url: '/api/articles/' + articleId,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function uploadImgData(data) {
  return request({
    method: 'post',
    url: '/api/articles/img',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}