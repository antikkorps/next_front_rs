export interface Tag {
  id: number
  postId: number
  tagName: string
}
export interface CardProps {
  post: {
    id: number
    title: string
    description: string
    postTypeChoice?: object
    image: string
    tags: Tag[]
    date: string
    likes: number
    comments: number
    shares: number
    bookmarks: number
    createdAt?: string
    _count: {
      likes: number
      comments: number
      shares: number
      bookmarks: number
    }
  }
}
