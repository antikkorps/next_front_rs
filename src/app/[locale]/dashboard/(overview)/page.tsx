import Card from "@/components/Card"
import CardDetail from "@/components/CardDetail"
import Stories from "@/components/Stories"
import { getPosts } from "../../../../../actions"

export default async function DashboardPage() {
  const posts = await getPosts()
  console.log(JSON.stringify(posts, null, 2))
  return (
    <>
      <div className="w-full sm:w-1/2 flex justify-center mx-auto mb-10 ">
        <Stories />
      </div>

      <div>
        {posts.map((post) => (
          <Card key={post.id} post={post} />  
        ))}
      </div>
      {/* <CardDetail /> */}
    </>
  )
}
