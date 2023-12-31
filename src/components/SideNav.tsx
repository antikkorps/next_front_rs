import Logo from "./Logo"
import {pick} from "lodash"
import NavLinks from "./NavLinks"
import MoreDropdown from "./MoreDropdown"
import { Button } from "./ui/button"
import { NextIntlClientProvider, useMessages } from "next-intl"

function SideNav() {
  const messages = useMessages();
  return (

    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="boder-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenlyfixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
        <Logo />
        <NextIntlClientProvider
        messages={pick(messages, 'Navigation')}
        >
          <NavLinks />
        
          {/* user && <ProfileLink/> */}

          <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
            <MoreDropdown />
          </div>
        </NextIntlClientProvider>
      </div>
    </div>
  )
}

export default SideNav
