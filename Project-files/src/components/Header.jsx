import React, { useEffect, useState } from "react"
import logo from "../assets/logo.png"
import { Link, NavLink, useNavigate } from "react-router-dom"
import userIcon from "../assets/user.png"
import { IoSearchOutline } from "react-icons/io5"
import { navigation } from "../content/navigation"

export const Header = () => {
  const [searchInput, setSearchInput] = useState("")
  const navigate = useNavigate()

  let handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (searchInput) navigate(`/search?q=${searchInput}`)
  }, [searchInput])

  return (
    <header className="fixed top-0 w-full h-16 bg-black/50  z-40">
      <div className="container mx-auto px-2 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="" width={120} />
        </Link>

        <nav className="hidden lg:flex item-center gap-1 ml-5">
          {navigation.map((nav) => {
            return (
              <div>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            )
          })}
        </nav>

        <div className="ml-auto flex gap-4 items-center">
          <div>
            <form
              action=""
              className="flex items-center gap-2"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent px-4 py-2 outline-none border-none hidden lg:block"
                onClick={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />

              <button className="cursor-pointer text-2xl text-white">
                <IoSearchOutline />
              </button>
            </form>
          </div>

          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer transition-all active:scale-75">
            <img src={userIcon} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
