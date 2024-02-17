import Image from "next/image"
import Link from "next/link"
import CardActionLikeBtn from "./ui/CardActionLikeBtn"
import CardActionCommentBtn from "./ui/CardActionCommentBtn"
import CardActionShareBtn from "./ui/CardActionShareBtn"
import CardActionBookmarkBtn from "./ui/CardActionBookmarkBtn"
import { Tag, CardProps } from "../../types/all"
import { getUser } from "../../actions/get-user.server"
import { PostSchemaWithRelation } from "@/zod/post/post"
import { getMessages, getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { pick } from "lodash"
import { getUserLikesBookmarksPosts } from "../../actions/user/get-posts-likes-bookmarks"

interface Props {
  post: PostSchemaWithRelation
}
const Card = async (props: Props) => {
  const { user, error } = await getUser();

  let userId = null
  if (user) {
    userId = user.id
  }

  const { userBookmarksLikes } = await getUserLikesBookmarksPosts(userId)

  const { post } = props;


  const messages = await getMessages()
  return (
    <>
      <article className="w-4/5 mx-auto pb-5 max-w-lg transform duration-500 hover:-translate-y-1 cursor-pointer">
        <div className="max-h-full overflow-hidden">
          <Image
            className="transform duration-300 hover:scale-110"
            width={500}
            height={900}
            src="https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        <NextIntlClientProvider
          messages={pick(messages, ["Register", "Login", "Input", "Button"])}
        >
          <div className="text-base mt-4 flex justify-between relative pr-2">
            <div className="flex gap-2">

              <CardActionLikeBtn
                itemType="POST"
                item={post}
                userId={userId}
              />

              <CardActionCommentBtn />
              <CardActionShareBtn />

            </div>
            <div className="">
              <CardActionBookmarkBtn
                key={userId + post.id}
                userId={userId}
                post={post}
                userBookmarks={userBookmarksLikes.bookmarks}
              />
            </div>
          </div>
        </NextIntlClientProvider>

        <div className="flex justify-between my-5 ">
          <div className="text-orange-500 text-base font-semibold">
            {post.tags.map((tag, index) =>
              tag.tagName ? <span key={index}>#{tag.tagName} </span> : null
            )}
          </div>
          <div className="text-base text-right">
            {post.createdAt ? (
              <>
                {String(new Date(post.createdAt).getDate()).padStart(2, "0")}/
                {String(new Date(post.createdAt).getMonth() + 1).padStart(2, "0")}
                <span className="font-bold">
                  /{new Date(post.createdAt).getFullYear()}
                </span>
              </>
            ) : (
              "Date non disponible"
            )}
          </div>
        </div>
        <h2 className="font-bold text-2xl">
          <a target="_blank" href="https://unsplash.com/photos/3-MftKobVtg">
            Post Title
          </a>
        </h2>
        <div className="flex flex-col justify-between mt-3 ">
          <div className="text-base text-gray-500">{post.description}</div>
          <div className="flex justify-end text-sm mt-2 text-right">
            <p className="ml-1">
              {post.tags.map((tag, index) =>
                tag.tagName ? <span key={index}>#{tag.tagName} </span> : null
              )}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="mb-1">Comments</h3>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Wow incredible piece of work!!!</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </div>

          <p className="text-sm text-gray-500">
            <Link href="">Read all comments...</Link>
          </p>
        </div>
      </article>
    </>
  )
}

export default Card;