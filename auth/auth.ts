//all the functions related to authentication which are calling the api methods

import { SignUpForm } from "@/zod/auth/signUp"
import { API_ENDPOINTS } from "../configs/apiEndpoints"


export async function login(data: SignUpForm) {
  const { email, password } = data;
  try {
    const response = await fetch(`http://localhost:4000/api/v1/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    // console.error(error, "auth.ts")
    // throw error
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

export async function register(data: SignUpForm) {
  const { password, email } = data;
  try {
    const response = await fetch(`http://localhost:4000/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })

    const data = await response.json()
    return data;

  } catch (error) {
    console.error(error)
    throw error
  }
}
