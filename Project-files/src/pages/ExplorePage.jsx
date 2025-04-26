import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "../Hooks/useFetch"
import axios from "axios"
export const ExplorePage = () => {
  const params = useParams()
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: page,
        },
      })

      setData((prev) => [...prev, ...response.data.results])
      setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.log(error)
    }
  }

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      page < totalPageNo
    ) {
      setPage((prev) => prev + 1)
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])
  return <div>ExplorePage</div>
}
