import axios from "axios"
import React, { useEffect, useState } from "react"

export const useFetch = (endpoint) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint)
      console.log(response.data)
      setLoading(false)
      setData(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
