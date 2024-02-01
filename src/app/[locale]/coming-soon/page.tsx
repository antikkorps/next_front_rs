import Link from "next/link"
import { ChevronLeft } from "lucide-react"
export default function ComingSoon() {
  return (
    <>
      <div className="bg-gray-200 font-sans leading-normal tracking-normal">
        {/* <!-- Hero section --> */}
        <section className="bg-white dark:bg-neutral-900 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6 text-gray-600 dark:text-white">
                We&apos;re launching soon
              </h1>
              <p className="text-gray-600 dark:text-white mb-12">
                Enter your email to be the first to know when we launch.
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex items-center">
                  <input
                    type="email"
                    className="text-gray-600 bg-gray-100 mr-3 py-2 px-4 w-full rounded-md focus:outline-none focus:bg-white"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                  >
                    Subscribe
                  </button>
                </div>
                <div className="flex justify-center hover:scale-110 transition-all mt-6">
                  <Link href="/" className="flex justify-center">
                    <ChevronLeft className="" />
                    Revenir sur le site
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* <!-- Features section --> */}
        <section className="bg-gray-200 dark:bg-neutral-600 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-600 dark:text-white">
                What to expect
              </h2>
              <p className="text-gray-600 dark:text-white mb-12">
                As all of you know, Tattoo artists are artists. They regularly produce art
                or objects from their art. Here you will be able to buy their art and
                support them. Moreover you will find some goodies from our site. Buying
                them will show your support to us and help the site grow. <br />
                Of course, we ship worldwide.
              </p>
            </div>
            <div className="flex flex-wrap -mx-4 mt-12">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                  <div className="text-4xl font-bold text-purple-600 mb-4">01</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">Feature 1</h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec orci
                    quis justo aliquam euismod eget a leo.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                  <div className="text-4xl font-bold text-purple-600 mb-4">02</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">Feature 2</h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec orci
                    quis justo aliquam euismod eget a leo.
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                  <div className="text-4xl font-bold text-purple-600 mb-4">03</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">Feature 3</h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec orci
                    quis justo aliquam euismod eget a leo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
