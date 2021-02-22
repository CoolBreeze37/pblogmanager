import {
  request
} from "./request";
export function getRepositoriesData(pageNumber, pageSize) {
  return request({
    url: '/api/repositories',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 50 : pageSize,
    }
  })
}
export function addRepositoryData(data) {
  return request({
    method: 'post',
    url: '/api/repositories',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}
export function deleteRepositoryData(repositoryId) {
  return request({
    method: 'delete',
    url: '/api/repositories/' + repositoryId
  })
}
export function updateRepositoryData(repositoryId, data) {
  return request({
    method: 'patch',
    url: '/api/repositories/' + repositoryId,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}