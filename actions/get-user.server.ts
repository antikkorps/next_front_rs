"use server"

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "../configs/apiEndpoints";
import { getSessionCookie } from "@/lib/auth-header";


export async function getUser() {
    const { name, value} = await getSessionCookie();
    let user = null;
    try {
        const response = await fetch(`${API_ENDPOINTS.USER_PROFILE}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `${name}=${value}`
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

        user = await response.json();

    } catch (error) {
        return {
            error: {
                code: 500,
                message: "Serveur down"
            },

        };
    }
    return {
        user: user
    };
}

export async function checkRoles(roles: { roleSlug: string }[], toCheck: string) {
    const roleSlugs = roles.map(role => role.roleSlug);
    return roleSlugs.includes(toCheck);
}