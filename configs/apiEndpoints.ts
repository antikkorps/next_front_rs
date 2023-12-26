// configs/apiEndpoints.ts

//TODO change this to the actual api url that we will choose
const BASE_URL = "localhost:4000/api/v1"

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  LOGOUT: `${BASE_URL}/logout`,
  REGISTER: `${BASE_URL}/register`,
}
