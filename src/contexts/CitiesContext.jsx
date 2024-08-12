import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({})

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("there was an error fetching data");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <CitiesContext.Provider value={{ cities, loading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

//custom hook for consuming context
function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCitiesContext must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCitiesContext };
