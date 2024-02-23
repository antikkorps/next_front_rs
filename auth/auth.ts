"use server"
//all the functions related to authentication which are calling the api methods
import { SignUpForm, SignUpWithoutConfirmPassword } from "@/zod/auth/signUp"
import { API_ENDPOINTS } from "../configs/apiEndpoints"
import { cookies } from "next/headers"

import { ForgotPassForm, ResetPassForm, forgotPassFormSchemaValidation, resetPasswordSchemaValidation } from "@/zod/auth/forgot-password"
import { getSessionCookie } from "@/lib/auth-header"
import { revalidatePath } from "next/cache"
import { getUser } from "../actions/get-user.server"


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
    revalidatePath("/dashboard")
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

export async function forgotPassword(data: ForgotPassForm) {

  const checkData = forgotPassFormSchemaValidation.safeParse(data)

  if(checkData.success === false) {
    return {success: false, error: checkData.error.format()}
  }

  const { email } = data;

  try {
    const response = await fetch(`${API_ENDPOINTS.FORGOTTEN_PASSWORD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

export async function resetPassword(data: ResetPassForm) {
  const checkData = resetPasswordSchemaValidation.safeParse(data)
  if(checkData.success === false) {
    return {success: false, error: checkData.error.format()}
  }
  const { password, token } = data;

  try {
    const response = await fetch(`${API_ENDPOINTS.RESET_PASSWORD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
      }),
    })

    const data = await response.json()
    return data;

  } catch (error) {
    console.error(error)
    throw error
  }

}

export async function resendEmailVerification() {
  const {user} = await getUser();

  if(!user) {
    return {success: false, error: "No user found"}
  }
  try {
    const response = await fetch(`${API_ENDPOINTS.RESEND_CONFIRMATION_MAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email
      }),
    })

    
    const data = await response.json()
    console.log(data)
    return data;
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function checkTokenEmailVerification(token: string) {
  
  const response = await fetch(`${API_ENDPOINTS.CHECK_CONFIRMATION_MAIL_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token
    }),
  })
 
  const data = await response.json()
  return data;
}