"use server"

import { StoreLikeSchema, StoreLikeType } from "@/zod/likes/like";
import { z } from "zod";
import { getUser } from "./get-user.server";
import { API_ENDPOINTS } from "../configs/apiEndpoints"
import { getAuthHeader } from "@/lib/auth-header";
import { revalidatePath } from "next/cache";


export async function like(data: StoreLikeType) {
    const checkData = StoreLikeSchema.safeParse(data)
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

    const {likedItemId, userId, likeType} = checkData.data;

    const authHeader = await getAuthHeader();
    const response = await fetch(API_ENDPOINTS.LIKES_CREATE, {
        method: "POST",
        body: JSON.stringify({
            likedItemId,
            likeType
        }),
        credentials: "include",
        headers : authHeader
    })
    
    const responseData = await response.json();
    revalidatePath('/dashboard')
    return {responseData};
}