import {
  request
} from "./request";
export function getPhotosData(albumId, pageNumber, pageSize) {
  return request({
    url: '/api/albums/' + albumId + "/photos",
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 10 : pageSize,
    }
  })
}
export function deletePhotoData(albumId, photoId) {
  return request({
    method: 'delete',
    url: '/api/albums/' + albumId + "/photos/" + photoId
  })
}