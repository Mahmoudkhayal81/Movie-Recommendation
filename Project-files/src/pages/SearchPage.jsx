import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const API_KEY = "YOUR_API_KEY"; // ← استبدله بمفتاحك الحقيقي

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);

  // تحديث الحقل حسب الكلمة في الرابط
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchInput(q);
  }, [location.search]);

  // البحث التلقائي مع كل كتابة (Debounce)
  useEffect(() => {
    if (!searchInput.trim()) {
      setData([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
          params: {
            query: searchInput,
            api_key: API_KEY,
          },
        });

        setData(response.data.results);
        navigate(`/search?q=${searchInput}`);
      } catch (error) {
        console.error("error", error);
      }
    }, 500); // نصف ثانية انتظار

    return () => clearTimeout(delay);
  }, [searchInput]);

  return (
    <div className="pt-16 min-h-screen bg-black text-white">
      {/* شريط البحث */}
      <div className="w-full flex justify-center mt-10 px-4 sticky top-16 z-40">
        <input
          type="text"
          placeholder="Search here..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[90%] sm:w-[300px] md:w-[400px] lg:w-[500px] p-3 bg-white text-black rounded shadow-md outline-none"
        />
      </div>

      <div className="container mx-auto px-4">
        <h3 className="text-base md:text-lg lg:text-2xl font-semibold my-6">
          Search Results For "{searchInput}"
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 place-items-center">
          {data.length > 0 ? (
            data
              .filter((item) => item.media_type === "movie" || item.media_type === "tv")
              .map((item) => (
                <Card
                  key={item.id + "_search"}
                  data={item}
                  media_type={item.media_type}
                />
              ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
