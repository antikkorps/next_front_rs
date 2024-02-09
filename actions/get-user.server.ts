"use server"

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "../configs/apiEndpoints";

export async function getUser() {
    const session_cookie_name = process.env.SESSION_COOKIE;
    const cookieStore = cookies()
    const session_cookie = cookieStore.get(session_cookie_name || '')
    // console.log({session_cookie})

    // const response = await fetch(`${API_ENDPOINTS.USER_PROFILE}`, {
    const response = await fetch(`http://localhost:4000/api/v1/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Cookie": `${session_cookie_name}=${session_cookie.value}`
            "Cookie": cookieStore.toString()
        },
        credentials: "include",

    });
    
    if (!response.ok) {
        return {
            error: {
                code: response.status,
                message: "Auth Error"
            },
            
        };
    }

    const user = await response.json();
    return {
        user: user
    };
}

export async function checkRoles(roles: { roleSlug: string }[], toCheck: string) {
    const roleSlugs = roles.map(role => role.roleSlug);
    return roleSlugs.includes(toCheck);
}