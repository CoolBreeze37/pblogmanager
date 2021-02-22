import {
  request
} from "./request";
export function getFriendLinkCategoriesData(pageNumber, pageSize) {
  return request({
    url: '/api/friendLinkCategories',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 50 : pageSize
    }
  })
}
export function addFriendLinkCategory(data) {
  return request({
    method: 'post',
    url: '/api/FriendLinkCategories/',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}
export function deleteFriendLinkCategoryData(friendLinkCategoryId) {
  return request({
    method: 'delete',
    url: '/api/friendLinkCategories/' + friendLinkCategoryId
  })
}