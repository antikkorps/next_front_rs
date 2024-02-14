import { API_ENDPOINTS } from "../configs/apiEndpoints"
import { PostSchemaWithRelation } from "@/zod/post/post"


export async function getPosts() {
  try {
    const response = await fetch(API_ENDPOINTS.POSTS)
    const data: PostSchemaWithRelation[] = await response.json()
    console.log("Réponse de l'API:", data)
    return data
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error)
    throw error
  }
}
