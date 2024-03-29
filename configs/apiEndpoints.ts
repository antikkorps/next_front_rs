
//TODO change this to the actual api url that we will choose
const BASE_URL = process.env.BASE_URL

export const API_ENDPOINTS = {
  //AUTH RELATED
  LOGIN: `${BASE_URL}/auth/signin`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REGISTER: `${BASE_URL}/auth/signup`,
  //TODO CORRECT THIS ENDPOINTS IN THE BACKEND
  FORGOTTEN_PASSWORD: `${BASE_URL}/auth/forgotten-password`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  RESEND_CONFIRMATION_MAIL: `${BASE_URL}/auth/resend-confirmation-mail-link`,
  CHECK_CONFIRMATION_MAIL_TOKEN: `${BASE_URL}/auth/confirm-email-check-token`,

  //USERS RELATED
  USERS: `${BASE_URL}/users/all`,
  USER_PROFILE: `${BASE_URL}/users/me`,
  USER_BY_ID: `${BASE_URL}/users/`,
  USER_POST_LIKE_AND_BOOKMARK: `${BASE_URL}/users/like-bookmarks-posts`, // + userId
  //ROLES RELATED
  ROLES: `${BASE_URL}/roles/all`,
  ROLE_BY_ID: `${BASE_URL}/roles/`,

  //SALONS RELATED
  SALONS: `${BASE_URL}/salons/all`,
  SALON_BY_ID: `${BASE_URL}/salons/`,

  //TODO I anticipate some of the endpoints
  //MEDIA RELATED
  MEDIA: `${BASE_URL}/media/all`,
  MEDIA_BY_ID: `${BASE_URL}/media/`,
  MEDIA_UPLOAD: `${BASE_URL}/media/upload`,
  MEDIA_DELETE: `${BASE_URL}/media/delete`,
  MEDIA_UPDATE: `${BASE_URL}/media/update`,

  //TODO I anticipate some of the endpoints
  //COMMENTS RELATED
  COMMENTS: `${BASE_URL}/comments/all`,
  COMMENTS_BY_ID: `${BASE_URL}/comments/`,
  COMMENTS_UPDATE: `${BASE_URL}/comments/update`,
  COMMENTS_DELETE: `${BASE_URL}/comments/delete`,
  COMMENTS_CREATE: `${BASE_URL}/comments/create`,
  COMMENTS_BY_USER_ID: `${BASE_URL}/comments/user/`,
  COMMENTS_BY_MEDIA_ID: `${BASE_URL}/comments/media/`,
  COMMENTS_BY_SALON_ID: `${BASE_URL}/comments/salon/`,

  //TODO I anticipate some of the endpoints
  //LIKES RELATED
  LIKES: `${BASE_URL}/likes/all`,
  LIKES_BY_ID: `${BASE_URL}/likes/`,
  LIKES_UPDATE: `${BASE_URL}/likes/update`,
  LIKES_DELETE: `${BASE_URL}/likes/delete`,
  LIKES_CREATE: `${BASE_URL}/like`,
  LIKES_BY_USER_ID: `${BASE_URL}/likes/user/`,
  LIKES_BY_MEDIA_ID: `${BASE_URL}/likes/media/`,
  LIKES_BY_SALON_ID: `${BASE_URL}/likes/salon/`,

  //TODO I anticipate some of the endpoints
  //BOOKMARKS RELATED
  BOOKMARKS: `${BASE_URL}/bookmarks/all`,
  BOOKMARKS_BY_ID: `${BASE_URL}/bookmarks/`,
  BOOKMARKS_UPDATE: `${BASE_URL}/bookmarks/update`,
  BOOKMARKS_DELETE: `${BASE_URL}/bookmarks/delete`,
  BOOKMARKS_CREATE: `${BASE_URL}/post/bookmarked`, // + postId
  BOOKMARKS_BY_USER_ID: `${BASE_URL}/bookmarks/user/`,
  BOOKMARKS_BY_MEDIA_ID: `${BASE_URL}/bookmarks/media/`,
  BOOKMARKS_BY_SALON_ID: `${BASE_URL}/bookmarks/salon/`,

  //POSTS RELATED
  POSTS: `${BASE_URL}/post`,
  POST_BY_ID: `${BASE_URL}/post/`,
  POSTS_UPDATE: `${BASE_URL}/post/update`,
  POSTS_DELETE: `${BASE_URL}/post/delete`,
  POSTS_CREATE: `${BASE_URL}/post/create`,
  POSTS_BY_USER_ID: `${BASE_URL}/post/user/`,
  POSTS_BY_MEDIA_ID: `${BASE_URL}/post/media/`,
  POSTS_BY_SALON_ID: `${BASE_URL}/post/salon/`,
}
