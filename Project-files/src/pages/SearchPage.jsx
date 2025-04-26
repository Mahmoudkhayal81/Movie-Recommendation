import React from "react"
import { useLocation } from "react-router-dom"

export const SearchPage = () => {
  const location = useLocation()
  console.log(location)
  return <div>SearchPage</div>
}
