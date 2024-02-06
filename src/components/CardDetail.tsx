import Image from "next/image"
import Link from "next/link"
import CardActionLikeBtn from "./ui/CardActionLikeBtn"
import CardActionCommentBtn from "./ui/CardActionCommentBtn"
import CardActionShareBtn from "./ui/CardActionShareBtn"
import CardActionBookmarkBtn from "./ui/CardActionBookmarkBtn"

export default function CardDetail() {
  return (
    <>
      <section className="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
        <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
          <Image
            className="xl:max-w-6xl"
            width={800}
            height={700}
            src="https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="content bg-white dark:bg-neutral-950 p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-0 right-0 h-full">
            <div className="text-base mt-4 flex justify-between">
              <div className="flex">
                <CardActionLikeBtn />
                <CardActionCommentBtn />
                <CardActionShareBtn />
                <div className="absolute right-0 px-1">
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
                Description Post Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ex quas, aut nulla reprehenderit ducimus facilis cupiditate omnis ipsum
                iure consequatur iste sit quos adipisci eaque beatae culpa cum repudiandae
                rem.
              </div>
              <div className="flex justify-end text-sm mt-2 text-right">
                <p className="ml-1">#tropcool</p>
                <p className="ml-1">#maldetete</p>
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
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-purple-800">
              Read More
            </button>
          </div>
        </section>
      </section>
    </>
  )
}
