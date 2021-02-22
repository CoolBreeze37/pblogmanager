import {
  request
} from "./request";

export function getCommentsData(pageNumber, pageSize, articleId, searchQuery, sortBy) {
  return request({
    url: '/api/comments',
    params: {
      pageNumber: pageNumber == null ? 1 : pageNumber,
      pageSize: pageSize == null ? 10 : pageSize,
      articleId: articleId,
      searchQuery: searchQuery,
      sortBy: sortBy
    }
  })
}
export function deleteCommentData(commentId) {
  return request({
    method: 'delete',
    url: '/api/comments/' + commentId
  })
}