import { createContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000"
const CitiesContext = createContext()

function CitiesProvider({children}) {
    const [cities, setCities] = useState([])
    const [loading, setIsLoading] = useState(false)
  
    useEffect(function () {
      async function fetchData() {
        try {
          setIsLoading(true)
          const res = await fetch(`${BASE_URL}/cities`)
          const data = await res.json()
          setCities(data)
        }
        catch {
          alert('there was an error fetching data')
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }, [])

    return (
      <CitiesContext.Provider value={{ cities, loading }}>
        {children}
      </CitiesContext.Provider>
    )
}

export {CitiesProvider}