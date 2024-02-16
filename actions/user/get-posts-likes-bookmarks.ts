"use server"
import { getSessionCookie } from "@/lib/auth-header";
import { API_ENDPOINTS } from "../../configs/apiEndpoints";

export async function getUserLikesBookmarksPosts(userId: number | null) {

    if(userId === null) {
        return {
            userBookmarksLikes: []
        }
    } 
    const { name, value } = await getSessionCookie();
    const response = await fetch(`${API_ENDPOINTS.USER_POST_LIKE_AND_BOOKMARK}/${userId}`, {
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
    const data = await response.json();

    return {
        userBookmarksLikes: data
    };
}