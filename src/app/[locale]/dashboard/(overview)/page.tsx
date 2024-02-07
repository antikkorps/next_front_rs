import Card from "@/components/Card"
import CardDetail from "@/components/CardDetail"
import Stories from "@/components/Stories"
import { API_ENDPOINTS } from "../../../../../configs/apiEndpoints"

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

export default function DashboardPage() {
  fetch(API_ENDPOINTS.POSTS)
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse de l'API:", data)
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des posts:", error)
    })

  const login = API_ENDPOINTS.LOGIN
  console.log("url de login", login)

  return (
    <>
      <div className="w-full sm:w-1/2 flex justify-center mx-auto mb-10 ">
        <Stories />
      </div>
      <div>
        {posts.map((post: Post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <CardDetail />
    </>
  )
}
