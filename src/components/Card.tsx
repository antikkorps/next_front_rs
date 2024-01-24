import Image from "next/image"
import CardActionLikeBtn from "./ui/CardActionLikeBtn"

export default function Card() {
  return (
    <>
      <section className="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
        <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
          <Image
            className="xl:max-w-6xl rounded-t-xl md:rounded-xl"
            width={1860}
            height={750}
            src="https://images.pexels.com/photos/5990153/pexels-photo-5990153.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1860"
            alt=""
          />
          <div className="content bg-white dark:bg-neutral-950 p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 right-5 rounded-b-xl md:rounded-sm ">
            <div className="flex justify-between font-bold text-sm">
              <p className="text-gray-400">Card tag</p>
              <p className="text-gray-400">17th March, 2024</p>
            </div>
            <h2 className="cardTitle">Card Title From Heaven</h2>
            <p className="cardTextSimple">
              Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              aperiam nulla cupiditate saepe sed quis veritatis minus rem adipisci
              aliquid.
            </p>
            <div className="flex justify-end ">
              <CardActionLikeBtn />
            </div>

            <div>
              <h3 className="cardH3Simple">Commentaires</h3>
              <p className="cardTextSimple">this is the latest comment</p>
            </div>
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-slate-500 ">
              En lire plus
            </button>
          </div>
        </section>
      </section>
    </>
  )
}
