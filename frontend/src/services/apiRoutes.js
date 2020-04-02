const API_ROOT = '/api';

export const upvotePostRoute = id => `${API_ROOT}/posts/${id}/upvote`;
export const getPostsRoute = `${API_ROOT}/posts`;
export const createPostRoute = getPostsRoute;
export const getPostRoute = id => `${API_ROOT}/posts/${id}`;
export const updatePostRoute = getPostRoute;
export const getCommentsRoute = () => `${API_ROOT}/comments`;
export const createCommentRoute = getCommentsRoute;
