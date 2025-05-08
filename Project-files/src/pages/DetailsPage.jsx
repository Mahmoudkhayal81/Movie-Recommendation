import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import useFetchDetails from "../Hooks/useFetchDetails"
import { HorizontalScrollCard } from "../components/HorizontalScrollCard"
import VideoPlay from "../components/VideoPlay"
import Divider from "../components/Divider"
import moment from "moment"

const DetailsPage = () => {
  const { explore, id } = useParams()
  const imageURL = useSelector(
    (state) =>
      state.movieoData?.imageURL || "https://image.tmdb.org/t/p/original"
  )

  const { data, loading } = useFetchDetails(`/${explore}/${id}`)
  const { data: castData } = useFetchDetails(`/${explore}/${id}/credits`)

  const { data: similarData } = useFetchDetails(`/${explore}/${id}/similar`)
  const { data: recommendationData } = useFetchDetails(
    `/${explore}/${id}/recommendations`
  )

  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>
  if (!data)
    return <div className="text-white text-center mt-10">No data found.</div>

  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ")

  return (
    <div className="bg-black text-white min-h-screen">
      {/* الخلفية */}
      <div className="w-full h-[300px] relative">
        <img
          src={imageURL + data.backdrop_path}
          alt={data.title || data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* المحتوى */}
      <div className="container mx-auto px-10 mt-6">
        <div className=" flex flex-col lg:flex-row gap-5 lg:gap-10">
          <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
            <img
              src={imageURL + data?.poster_path}
              className="h-80 w-60 object-cover rounded"
            />
            <button
              onClick={() => handlePlayVideo(data)}
              className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
            >
              Play Now
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3">
              {data.title || data.name}
            </h1>
            <p className="text-neutral-400">{data?.tagline}</p>

            <Divider />

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
              <span>⭐ Rating: {data.vote_average?.toFixed(1) || "N/A"}</span>
              {explore === "movie" && (
                <span>
                  ⏱️ Duration: {data.runtime ? `${data.runtime} min` : "N/A"}
                </span>
              )}
              {explore === "tv" && (
                <span>
                  ⏱️ Duration:{" "}
                  {data.episode_run_time?.[0]
                    ? `${data.episode_run_time[0]} min`
                    : "N/A"}
                </span>
              )}
              <span>🔥 Popularity: {data.popularity?.toFixed(0) || "N/A"}</span>
            </div>
            <Divider />

            <div>
              <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
              <p>{data?.overview}</p>

              <Divider />
              <div className="flex items-center gap-3 my-3 text-center">
                <p>Staus : {data?.status}</p>
                <span>|</span>
                <p>
                  Release Date :{" "}
                  {moment(data?.release_date).format("MMMM Do YYYY")}
                </p>
                <span>|</span>
                <p>Revenue : {Number(data?.revenue) || "No data available"}</p>
              </div>

              <Divider />
            </div>
            <div>
              <p>
                <span className="text-white">Director</span> :
                {castData?.crew[0]?.name || "No director"}
              </p>

              <Divider />

              <p>
                <span className="text-white">
                  Writer : {writer || "No writer"}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* كروت الممثلين */}
        {castData?.cast?.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-4">Top Cast</h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {castData.cast.slice(0, 10).map((person) => (
                <div key={person.id} className="w-28 flex-shrink-0 text-center">
                  <img
                    src={
                      person.profile_path
                        ? imageURL + person.profile_path
                        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    alt={person.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                  />

                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-gray-400">{person.character}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <div>
          <HorizontalScrollCard
            data={similarData?.results}
            heading={"Similar " + explore}
            media_type={explore}
          />
          <HorizontalScrollCard
            data={recommendationData?.results}
            heading={"Recommendation " + explore}
            media_type={explore}
          />
        </div>
        {playVideo && (
          <VideoPlay
            data={playVideoId}
            close={() => setPlayVideo(false)}
            media_type={explore}
          />
        )}
      </div>
    </div>
  )
}

export default DetailsPage
