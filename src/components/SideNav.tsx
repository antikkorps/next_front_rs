import Logo from "./Logo"
import { pick } from "lodash"
import NavLinks from "./NavLinks"
import MoreDropdown from "./MoreDropdown"
import { NextIntlClientProvider, useMessages } from "next-intl"
import LogoutButton from "./auth/LogoutButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusSquare, HomeIcon, Search, Popcorn } from "lucide-react"
function SideNav() {
  const messages = useMessages()
  return (
    <>
      <div className="hidden md:flex h-full flex-col px-3 py-4 md:px-2">
        <div className="boder-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
          <Logo />
          <NextIntlClientProvider messages={pick(messages, ["Navigation", "Logout"])}>
            <NavLinks />

            {/* user && <ProfileLink/> */}

            <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
              <MoreDropdown />
            </div>
            <LogoutButton />
          </NextIntlClientProvider>
        </div>
      </div>
      <div className="flex md:hidden fixed bottom-0 left-0 bg-white dark:bg-neutral-950 h-20 w-full justify-evenly z-10 items-center">
        <HomeIcon className="w-8 h-8" />
        <Search className="w-8 h-8" />
        <PlusSquare className="w-8 h-8" />
        <Popcorn className="w-8 h-8" />
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </>
  )
}

export default SideNav
