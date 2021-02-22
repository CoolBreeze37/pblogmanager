import {
  request
} from "./request";

export function GetTokenData(data) {
  return request({
    method: 'post',
    url: '/auth/token',
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}