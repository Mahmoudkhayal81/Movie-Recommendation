import { AiFillHome } from "react-icons/ai"
import { BiSolidMovie } from "react-icons/bi"
import { PiTelevisionFill } from "react-icons/pi"
import { IoSearchOutline } from "react-icons/io5"

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <BiSolidMovie />,
  },
]

export const MobileNavigations = [
  {
    label: "Home",
    href: "/",
    icon: <AiFillHome />,
  },
  ...navigation,
  {
    label: "Search",
    href: "/",
    icon: <IoSearchOutline />,
  },
]
