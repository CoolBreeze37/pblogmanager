import {
  request
} from "./request";
export function getAlbumsData(pageNumber, pageSize) {
  return request({
    url: '/api/albums',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 10 : pageSize,
    }
  })
}
export function deleteAlbumData(albumId) {
  return request({
    method: 'delete',
    url: '/api/albums/' + albumId
  })
}

export function addAlbumData(data) {
  return request({
    method: 'post',
    url: '/api/albums/',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}

export function updataAlbumData(albumId, data) {
  return request({
    method: 'patch',
    url: '/api/albums/' + albumId,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}