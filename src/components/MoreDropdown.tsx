"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { useState, useEffect, useRef } from "react"

function MoreDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // setShowModeToggle(false)
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [ref])

  return (
    <>
      <DropdownMenu open={open}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setOpen(!open)}
            variant={"ghost"}
            size={"lg"}
            className="md:w-full !justify-start space-x-2 !px-3"
          >
            <Menu />
            <div className="hidden lg:block">More</div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent ref={ref}>
          <DropdownMenuItem>
            <DropdownMenuLabel>More</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default MoreDropdown
