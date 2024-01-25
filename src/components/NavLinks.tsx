"use client"

import { ComponentProps } from "react"
import { usePathname } from "next/navigation"
import { checkPathname } from "../lib/navigationLinks/checkPathname"
import { pathnames, type AppPathnames } from "../i18n/intlConfig"
import { Link } from "../i18n/navigation"
import {
  Home,
  Search,
  Compass,
  Clapperboard,
  MessageCircle,
  Heart,
  PlusSquare,
  LucideIcon,
  StoreIcon,
} from "lucide-react"
// import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { useTranslations } from "next-intl"

interface NavLink {
  name: string
  href: AppPathnames
  icon: LucideIcon
  hideOnMobile?: boolean
}

const getLinks = () => {
  const t = useTranslations("Navigation")
  const links: NavLink[] = [
    { name: t("sidebar.home"), href: "/dashboard", icon: Home },
    {
      name: t("sidebar.search"),
      href: "/dashboard/search",
      icon: Search,
      hideOnMobile: true,
    },
    { name: t("sidebar.explore"), href: "/dashboard/explore", icon: Compass },
    { name: t("sidebar.reels"), href: "/dashboard/reels", icon: Clapperboard },
    { name: t("sidebar.messages"), href: "/dashboard/messages", icon: MessageCircle },
    {
      name: t("sidebar.notifications"),
      href: "/dashboard/notifications",
      icon: Heart,
      hideOnMobile: true,
    },
    { name: t("sidebar.create"), href: "/dashboard/create", icon: PlusSquare },
    { name: t("sidebar.shop"), href: "/shop", icon: StoreIcon },
  ]
  return links
}

function NavLinks() {
  const links = getLinks()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        const checkPathnameData = checkPathname(link.href)
        const currentPathname = usePathname() // Assurez-vous d'avoir une fonction usePathname appropriée
        const currentPathnameWithoutLocale = currentPathname.replace(/^\/[a-z]{2}\b/, "")
        const isActive = checkPathnameData?.includes(currentPathnameWithoutLocale)

        return (
          <NavigationLink
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6 h-6" />
            <p className={`${cn("hidden lg:block", { "font-extrabold": isActive })}`}>
              {link.name}
            </p>
          </NavigationLink>
        )
      })}
    </>
  )
}

export default NavLinks

function NavigationLink<Pathname extends AppPathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const checkPathnameData = checkPathname(href)
  const currentPathname = usePathname() // Assurez-vous d'avoir une fonction usePathname appropriée
  const currentPathnameWithoutLocale = currentPathname.replace(/^\/[a-z]{2}\b/, "")
  const isActive = checkPathnameData?.includes(currentPathnameWithoutLocale)

  return <Link aria-current={isActive ? "page" : undefined} href={href} {...rest} />
}
