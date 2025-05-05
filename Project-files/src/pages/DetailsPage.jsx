import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchDetails from "../Hooks/useFetchDetails";
import Card from "../components/Card";
import axios from "axios";

const DetailsPage = () => {
  const { explore, id } = useParams();
  const imageURL = useSelector((state) => state.movieoData?.imageURL || "https://image.tmdb.org/t/p/original");

  // جلب بيانات الفيلم
  const { data, loading } = useFetchDetails(`/${explore}/${id}`);
  const { data: castData } = useFetchDetails(`/${explore}/${id}/credits`);
  
  // جلب الأفلام المشابهة
  const [similarMovies, setSimilarMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(1);

  const fetchSimilarMovies = async () => {
    try {
      const response = await axios.get(`/${explore}/${id}/similar`, {
        params: {
          page: page,
        },
      });

      setSimilarMovies((prev) => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log("Error fetching similar movies:", error);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      page < totalPageNo
    ) {
      setPage((prev) => prev + 1);
    }
  }, [page, totalPageNo]);

  useEffect(() => {
    fetchSimilarMovies();
  }, [page]);

  useEffect(() => {
    setSimilarMovies([]);
    setPage(1);
    setTotalPageNo(1);
    fetchSimilarMovies();
  }, [id]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!data) return <div className="text-white text-center mt-10">No data found.</div>;

  // تمرير الأفلام المشابهة باستخدام السهمين
  const handleScrollLeft = () => {
    const container = document.getElementById("similar-movies-container");
    container.scrollLeft -= 300;
  };

  const handleScrollRight = () => {
    const container = document.getElementById("similar-movies-container");
    container.scrollLeft += 300;
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* الخلفية */}
      <div className="w-full h-[300px] relative">
        <img src={imageURL + data.backdrop_path} alt={data.title || data.name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* المحتوى */}
      <div className="container mx-auto px-4 mt-6">
        <h1 className="text-3xl font-bold mb-3">{data.title || data.name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
          <span>⭐ Rating: {data.vote_average?.toFixed(1) || "N/A"}</span>
          {explore === "movie" && (
            <span>⏱️ Duration: {data.runtime ? `${data.runtime} min` : "N/A"}</span>
          )}
          {explore === "tv" && (
            <span>⏱️ Duration: {data.episode_run_time?.[0] ? `${data.episode_run_time[0]} min` : "N/A"}</span>
          )}
          <span>🔥 Popularity: {data.popularity?.toFixed(0) || "N/A"}</span>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">{data.overview || "No description available."}</p>

        {/* إضافة خط بين الأقسام */}
        <hr className="border-gray-500 my-6" />

        {/* المخرج والمؤلف */}
        {castData?.crew && (
          <div className="text-sm text-gray-300 mb-4 space-y-1">
            {/* Director */}
            <div>
              <span className="font-semibold text-white">Director:</span>{" "}
              {castData.crew
                .filter((member) => member.job === "Director")
                .map((director) => director.name)
                .join(", ") || "N/A"}
            </div>

            {/* Writer */}
            <div>
              <span className="font-semibold text-white">Writer:</span>{" "}
              {castData.crew
                .filter(
                  (member) =>
                    member.job === "Screenplay" ||
                    member.job === "Writer" ||
                    member.job === "Story"
                )
                .map((writer) => writer.name)
                .join(", ") || "N/A"}
            </div>
          </div>
        )}

        {/* إضافة خط بين المخرجين والمؤلفين */}
        <hr className="border-gray-500 my-6" />

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

        {/* إضافة خط بين الممثلين */}
        <hr className="border-gray-500 my-6" />

        {/* الأفلام المشابهة */}
        {similarMovies.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-4">Similar Movies</h2>
            <div className="relative">
              {/* السهم الأيسر */}
              <button
                onClick={handleScrollLeft}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <div
                id="similar-movies-container"
                className="flex overflow-x-auto gap-4 pb-4 scroll-smooth"
              >
                {similarMovies.map((movie) => (
                  <Card
                    key={movie.id}
                    data={movie}
                    media_type={explore}
                  />
                ))}
              </div>
              {/* السهم الأيمن */}
              <button
                onClick={handleScrollRight}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
