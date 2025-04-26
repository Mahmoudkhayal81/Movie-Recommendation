import React from "react"
import { MobileNavigations } from "../content/navigation"
import { NavLink } from "react-router-dom"

export const MobileNavigation = () => {
  return (
    <section className="h-14 w-full bg-black/70 backdrop-blur-3xl fixed bottom-0 lg:hidden z-10">
      <div className="flex items-center justify-between h-full text-neutral-400">
        {MobileNavigations.map((nav) => {
          return (
            <NavLink
              to={`${nav.href}`}
              key={nav.label + "mobileNavigation"}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${
                  isActive && "text-white"
                }`
              }
            >
              <div className="text-2xl">{nav.icon}</div>
              <p>{nav.label}</p>
            </NavLink>
          )
        })}
      </div>
    </section>
  )
}
