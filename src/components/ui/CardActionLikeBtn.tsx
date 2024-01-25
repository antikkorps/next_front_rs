"use client"
import { useState } from "react"

export default function CardActionLikeBtn() {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div onClick={handleLike}>
      <div>
        {isLiked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            stroke="red"
            className="w-6 h-6 mr-2 text-red-200 hover:animate-ping"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mr-2 text-gray-400 hover:text-red-200 hover:animate-ping"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </div>
    </div>
  )
}
