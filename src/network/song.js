import {
  request
} from "./request";

export function uploadSongs(data, onUploadProgress) {
  return request({
    method: "post",
    url: '/api/songs/multiplefiles',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onUploadProgress
  })
}

export function getSongsData(pageNumber, pageSize, searchQuery, sortBy) {
  return request({
    url: '/api/songs',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 10 : pageSize,
      searchQuery: searchQuery,
      sortBy: sortBy
    }
  })
}