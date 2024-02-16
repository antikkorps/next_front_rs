"use server"

import { getAuthHeader } from "@/lib/auth-header";
import { revalidatePath } from "next/cache";
import { getUser } from "../get-user.server";
import { API_ENDPOINTS } from "../../configs/apiEndpoints";
import { CreateBookmarkSchema, CreateBookmarkType } from "@/zod/bookmarks/bookmark";



export async function bookmark(data: CreateBookmarkType) {
    const checkData = CreateBookmarkSchema.safeParse(data)
    if (!checkData.success) {
        return {
            errors: checkData.error.flatten().fieldErrors,
            message: "Invalid data. Failed to like this item"
        };
    }
    const {user, error} = await getUser();
    
    if(!user && error ) {
        return {
            error: {
                code: 403,
                message: "Auth Error"
            },

        };
    }

    const {postId, userId} = checkData.data;

    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_ENDPOINTS.BOOKMARKS_CREATE}/${postId}`, {
        method: "POST",
        // body: JSON.stringify({
        //     postId,
        //     userId
        // }),
        credentials: "include",
        headers : authHeader
    })
    
    const responseData = await response.json();
    revalidatePath('/dashboard')
    return {responseData};
}