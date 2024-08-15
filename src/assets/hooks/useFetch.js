import axios from "axios"
import { useState } from "react"

const useFetch = (url) => {
  const [data, setData] = useState()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)


  const getData = () => { 
    axios
    .get(url)
    .then((res) => {
        setData(res.data)
        setError(false)
    })
    .catch((err) => {
        console.error(err)
        setError(true)
    })
    .finally(() => {
        setLoading(false);
    });
   };

   return [data, getData, error, loading,]
}

export default useFetch