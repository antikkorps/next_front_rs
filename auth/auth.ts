"use server"
//all the functions related to authentication which are calling the api methods
import { SignUpForm, SignUpWithoutConfirmPassword } from "@/zod/auth/signUp"
import { API_ENDPOINTS } from "../configs/apiEndpoints"
import { cookies } from "next/headers"
import { getSessionCookie } from "../actions/get-user.server"


const session_cookie_name = process.env.NEXT_PUBLIC_SESSION_COOKIE || '';

export async function login(data: SignUpForm) {
  const checkData = SignUpWithoutConfirmPassword.safeParse(data)
  if(checkData.success === false) {
    return {success: false, error: checkData.error.format()}
  }

  const { email, password } = data;

  try {
    const response = await fetch(`${API_ENDPOINTS.LOGIN}`, {
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

    // if(!data.error) {
    // // const token = data.token
    // // localStorage.setItem("jwt", data.access_token)
    // }
    

    cookies().set({
        name: session_cookie_name,
        value: data.access_token,
    })
    return data
  } catch (error) {
    // console.error(error, "auth.ts")
    // throw error
  }
}

export async function logout() {
  const {name, value} = await getSessionCookie();
  if(!name && !value) {
    return {success: false, error: "No session cookie found"}
  } 
  cookies().delete(session_cookie_name)
  return {success: true, message: "Logged out successfully"}
}

export async function register(data: SignUpForm) {
  const { password, email } = data;
  try {
    const response = await fetch(`${API_ENDPOINTS.REGISTER}`, {
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

// To do
export async function forgotPassword() {

}

export async function resetPassword() {

}

export async function resendEmailVerification() {

}

