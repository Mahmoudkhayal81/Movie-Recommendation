import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchDetails from "../Hooks/useFetchDetails";

const DetailsPage = () => {
  const { explore, id } = useParams();
  const imageURL = useSelector((state) => state.movieoData?.imageURL || "https://image.tmdb.org/t/p/original");

  const { data, loading } = useFetchDetails(`/${explore}/${id}`);
  const { data: castData } = useFetchDetails(`/${explore}/${id}/credits`);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!data) return <div className="text-white text-center mt-10">No data found.</div>;

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
      </div>
    </div>
  );
};

export default DetailsPage;
