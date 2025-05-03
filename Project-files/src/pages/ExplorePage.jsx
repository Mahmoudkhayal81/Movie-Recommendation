import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

export const ExplorePage = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: page,
        },
      });

      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log("error", error);
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
    fetchData();
  }, [page]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setTotalPageNo(1);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="pt-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-2">
          Popular {params.explore} shows
        </h3>

        <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {data.map((item, index) => (
                <Card
                  key={`${params.explore}-${item.id}-${index}`}
                  data={item}
                  media_type={params.explore}
                />
              ))}
            </div>
          </div>

      </div>
    </div>
  );
};
