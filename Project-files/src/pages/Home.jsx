import { BannerHome } from "../components/BannerHome"
import { useSelector } from "react-redux"
import { HorizontalScrollCard } from "../components/HorizontalScrollCard"
import { useFetch } from "../Hooks/useFetch"

export const Home = () => {
  const trendingData = useSelector((state) => state.moviesData.bannerData)

  const { data: nowPlayingData, loading: loadingNowPlaying } =
    useFetch(`/movie/now_playing`)
  const { data: topRated, loading: loadingTopRated } =
    useFetch(`/movie/top_rated`)
  const { data: popularTVShowData, loading: loadingPopular } =
    useFetch("tv/popular")
  const { data: onTheAir, loading: loadingOnTheAir } = useFetch("tv/on_the_air")
  console.log("trending Data", trendingData)
  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />
      {loadingNowPlaying ? (
        <p>Loading Now Playing</p>
      ) : (
        <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"} />
      )}
      {loadingTopRated ? (
        <p>Loading Top Rated</p>
      ) : (
        <HorizontalScrollCard data={topRated} heading={"Top Rated"} media_type={"movie"} />
      )}
      {loadingPopular ? (
        <p>Loading Popular TV Show</p>
      ) : (
        <HorizontalScrollCard
          data={popularTVShowData}
          heading={"Popular TV Show"} media_type={"tv"}
        />
      )}
      {loadingOnTheAir ? (
        <p>Loading On The Air</p>
      ) : (
        <HorizontalScrollCard data={onTheAir} heading={"On The Air"} media_type={"tv"} />
      )}
    </div>
  )
}
