import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"


const BASE_URL = "http://localhost:8000"

function App() {

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

  return (<BrowserRouter>
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppLayout />}>
        {/* Nested Routes/child routes */}
        <Route index element={<CityList cities={cities} loading={loading} />} />
        <Route path="cities" element={<CityList cities={cities} loading={loading} />} />
        <Route path="countries" element={<CountryList cities={cities} loading={loading} />} />
        <Route path="form" element={<p>form</p>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>)
}

export default App
