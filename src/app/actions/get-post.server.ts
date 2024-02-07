import { API_ENDPOINTS } from "../../../configs/apiEndpoints"

interface Post {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  date: string
  likes: number
  comments: number
  shares: number
  bookmarks: number
}

export async function getPosts() {
  try {
    const response = await fetch(API_ENDPOINTS.POSTS)
    const data: Post[] = await response.json()
    console.log("Réponse de l'API:", data)
    return data
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error)
    throw error
  }
}
