import {
  request
} from "./request";
export function getFriendLinksData(pageNumber, pageSize, category) {
  return request({
    url: '/api/friendLinks',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 50 : pageSize,
      category: category
    }
  })
}
export function addFriendLinkData(data) {
  return request({
    method: 'post',
    url: '/api/FriendLinks',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}
export function deleteFriendLinkData(friendLinkId) {
  return request({
    method: 'delete',
    url: '/api/friendLinks/' + friendLinkId
  })
}
export function updateFriendLinkData(friendLinkId, data) {
  return request({
    method: 'patch',
    url: '/api/friendLinks/' + friendLinkId,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}