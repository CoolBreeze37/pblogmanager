import {
  request
} from "./request";

export function getGroundLessTalksData(pageNumber, pageSize) {
  return request({
    url: '/api/groundLessTalks',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 15 : pageSize,
    }
  })
}
export function deleteGroundLessTalkData(groundLessTalkId) {
  return request({
    method: 'delete',
    url: '/api/groundLessTalks/' + groundLessTalkId
  })
}
export function createGroundLessTalkData(data) {
  return request({
    method: 'post',
    url: '/api/groundLessTalks/',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}