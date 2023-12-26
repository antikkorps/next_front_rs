//all the functions related to authentication which are calling the api methods

import { API_ENDPOINTS } from "../configs/apiEndpoints"

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()

    const token = data.token

    localStorage.setItem("jwt", token)

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function logout() {
  try {
    const response = await fetch(`${API_ENDPOINTS.LOGOUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function register(username: string, password: string, email: string) {
  try {
    const response = await fetch(`${API_ENDPOINTS.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    })
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
