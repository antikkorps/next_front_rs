import Image from "next/image"
import Link from "next/link"
import CardActionLikeBtn from "./ui/CardActionLikeBtn"
import CardActionCommentBtn from "./ui/CardActionCommentBtn"
import CardActionShareBtn from "./ui/CardActionShareBtn"
import CardActionBookmarkBtn from "./ui/CardActionBookmarkBtn"

export default function Card() {
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
        <div className="text-base mt-4 flex justify-between relative">
          <div className="flex">
            <CardActionLikeBtn />
            <CardActionCommentBtn />
            <CardActionShareBtn />
            <div className="absolute right-0">
              <CardActionBookmarkBtn />
            </div>
          </div>
        </div>
        <div className="text-gray-500 mt-2">xxx Likes</div>

        <div className="flex justify-between my-5 ">
          <div className="text-orange-500 text-base font-semibold">tags</div>
          <div className="text-base text-right">
            <span className="font-bold">Day/Month</span>/Year
          </div>
        </div>
        <h2 className="font-bold text-2xl">
          <a target="_blank" href="https://unsplash.com/photos/3-MftKobVtg">
            Post Title
          </a>
        </h2>
        <div className="flex flex-col justify-between mt-3 ">
          <div className="text-base text-gray-500">
            Description Post Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            quas, aut nulla reprehenderit ducimus facilis cupiditate omnis ipsum iure
            consequatur iste sit quos adipisci eaque beatae culpa cum repudiandae rem.
          </div>
          <div className="flex justify-end text-sm mt-2 text-right">
            <p className="ml-1">#tropcool</p>
            <p className="ml-1">#maldetete</p>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="mb-1">Comments</h3>
          <p className="text-sm text-gray-500">Wow incredible piece of work!!!</p>
          <p className="text-sm text-gray-500">
            <Link href="">Read all comments...</Link>
          </p>
        </div>
      </article>
    </>
  )
}
