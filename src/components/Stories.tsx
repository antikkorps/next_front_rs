import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import React from "react"

export default function Stories() {
  return (
    <Avatar className="h-14 w-14 sm:h-18 sm:w-18 outline outline-offset-1 hover:outline-offset-4 outline-2 outline-orange-500 hover:scale-150 transition-all duration-300	">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
