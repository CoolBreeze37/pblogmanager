import {
  request
} from "./request";
export function getUsersData(pageNumber, pageSize, searchQuery, sortBy) {
  return request({
    url: '/api/users',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 10 : pageSize,
      searchQuery: searchQuery,
      sortBy: sortBy
    }
  })
}
export function deleteUserData(userId) {
  return request({
    method: 'delete',
    url: '/api/users/' + userId,
  })
}
export function updateUserData(userId, data) {
  return request({
    method: 'patch',
    url: '/api/users/' + userId,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}