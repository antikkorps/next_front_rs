import Logo from "./Logo"
import NavLinks from "./NavLinks"
import { Button } from "./ui/button"

function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="boder-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenlyfixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
        <Logo />
        <NavLinks />
        {/* user && <ProfileLink/> */}

        <div>{/* <MoreDropdown /> */}</div>
      </div>
    </div>
  )
}

export default SideNav
