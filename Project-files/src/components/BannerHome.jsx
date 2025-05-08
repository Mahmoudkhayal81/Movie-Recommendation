import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { Link } from "react-router-dom"

export const BannerHome = () => {
  const { bannerData, imageURL: imageBaseURL } = useSelector(
    (state) => state.moviesData
  )
  const [currentImage, setCurrentImage] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0))
  }, [bannerData])
  const handlePrev = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [handleNext])

  console.log("Banner Data", bannerData)

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.length > 0
          ? bannerData.map((data, index) => {
              console.log(data)
              return (
                <div
                  key={data.id + "BannerHome" + index}
                  className="min-w-full min-h-[450px] lg:min-h-[100%] overflow-hidden relative group transition-all"
                  style={{ transform: `translateX(${currentImage * -100}%)` }}
                >
                  <div className="w-full h-full">
                    <img
                      src={imageBaseURL + data.backdrop_path}
                      alt=""
                      className="h-full object-cover w-full"
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* button next and prev image */}
                  <div className="absolute top-0 w-full h-full hidden items-center justify-between z-10 group-hover:lg:flex">
                    <button
                      onClick={handlePrev}
                      className=" cursor-pointer bg-white p-1 rounded-full text-lg text-black"
                    >
                      <FaAngleLeft />
                    </button>
                    <button
                      onClick={handleNext}
                      className=" cursor-pointer bg-white p-1 rounded-full text-lg text-black"
                    >
                      <FaAngleRight />
                    </button>
                  </div>

                  <div className="absolute top-0  w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

                  <div className="container mx-auto relative z-10">
                    <div className=" w-full absolute bottom-0 max-w-md px-3">
                      <h2 className="font-bold text-2xl lg:text-4xl drop-shadow-2xl text-white ">
                        {data?.title || data?.name}
                      </h2>
                      <p className="text-ellipsis line-clamp-3 my-2">
                        {data.overview}
                      </p>
                      <div className="flex items-center gap-4">
                        <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                        <span>|</span>
                        <p>View: {data.popularity.toFixed(0)}</p>
                      </div>
                      <Link to={"/" + data?.media_type + "/" + data.id}>
                        <button className=" bg-white px-4 py-2 text-black font-bold rounded mt-4  hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md cursor-pointer transition-all hover:scale-105">
                          Play Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          : "Loading..."}
      </div>
    </section>
  )
}
