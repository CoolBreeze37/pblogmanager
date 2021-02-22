import {
  request
} from "./request";

export function getUserData(userId) {
  return request({
    url: '/api/users/' + userId
  })
}
export function getUserProfileInfoData(userId) {
  return request({
    url: '/api/users/' + userId + '/profileInfo'
  })
}

export function updataUserData(userId, data) {
  return request({
    method: 'patch',
    url: '/api/users/' + userId,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export function uploadPhoto(userId, data) {
  return request({
    method: "post",
    url: '/api/users/' + userId + '/profileInfo',
    data: data
  })
}
export function updataUserProfileInfoData(userId, data) {
  return request({
    method: 'patch',
    url: '/api/users/' + userId + '/profileInfo',
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}