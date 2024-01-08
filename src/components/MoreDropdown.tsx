"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Settings,
  Activity,
  Bookmark,
  Moon,
  Sun,
  LogOut,
  ChevronLeft,
} from "lucide-react"

import { Button } from "./ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"

function MoreDropdown() {
  const [showModeToggle, setShowModeToggle] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Navigation')
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowModeToggle(false)
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
            <div className="hidden lg:block">{t('sidebar.more.more')}</div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          ref={ref}
          className={cn(
            "dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity",
            !open && "opacity-0"
          )}
          align="end"
          alignOffset={-40}
        >
          {!showModeToggle && (
            <>
              <DropdownMenuItem className="menuItem">
                <Settings size={20} />
                <p>{t('sidebar.more.settings')}</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="menuItem">
                <Activity size={20} />
                <p>{t('sidebar.more.your_activity')}</p>
              </DropdownMenuItem>

              <DropdownMenuItem className="menuItem">
                <Bookmark size={20} />
                <p>{t('sidebar.more.saved')}</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menuItem"
                onClick={() => setShowModeToggle(true)}
              >
                <Moon size={20} />
                <p>{t('sidebar.more.switch_appearance')}</p>
              </DropdownMenuItem>

              {/* <DropdownMenuItem className="menuItem" onClick={() => signOut()}>
                <LogOut size={20} />
                <p>Log out</p>
              </DropdownMenuItem> */}
            </>
          )}

          {showModeToggle && (
            <>
              <div
                className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5 cursor-pointer"
                onClick={() => setShowModeToggle(false)}
              >
                <ChevronLeft size={18} />
                <p className="font-bold ml-1">Switch appearance</p>
                {theme === "dark" ? (
                  <Moon size={20} className="ml-auto" />
                ) : (
                  <Sun size={20} className="ml-auto" />
                )}
              </div>
              <Label htmlFor="dark-mode" className="menuItem">
                Dark Mode
                <DropdownMenuItem className="ml-auto !p-0">
                  <Switch
                    id="dark-mode"
                    className="ml-auto"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light")
                    }}
                  />
                </DropdownMenuItem>
              </Label>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default MoreDropdown
