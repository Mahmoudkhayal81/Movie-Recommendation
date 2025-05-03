import { useEffect, useState } from "react";
import axios from "axios";

// ✨ هنا بنكتب الـ API Key مباشرة بدل .env
const apiKey = "YOUR_API_KEY"; // ← استبدلها بالمفتاح الحقيقي بتاعك

const useFetchDetails = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3${endpoint}`, {
          params: {
            api_key: apiKey,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [endpoint]);

  return { data, loading };
};

export default useFetchDetails;
