import React from "react"
import { useSelector } from "react-redux"
import moment from "moment"
import { Link } from "react-router-dom"
export const Card = ({ data, trending, index }) => {
  const imageURL = useSelector((state) => state.moviesData.imageURL)
  console.log(data)
  return (
    <Link
      to={"/" + data.media_type + "/" + data.id}
      className="w-full min-w-[230px] max-w-[230px] rounded h-80 overflow-hidden relative"
    >
      <img loading="lazy" src={imageURL + data?.poster_path} alt="" />

      <div className="absolute top-4">
        {trending && (
          <div className="py-1 px-4  backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
            #{index + 1} Trending
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-eclipsis line-clamp-1 text-large font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-400">
            {moment(data.release_date).format("MMMM Do YYYY")}
          </p>
          <p className="bg-black px-1 rounded-full text-xs text-white">
            Rating: {data.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  )
}
