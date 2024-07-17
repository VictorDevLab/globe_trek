import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import Products from "./pages/Products"
import PageNotFound from "./pages/PageNotFound"

function App() {

  return (<BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/products" element={<Products />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
  </BrowserRouter>)
}

export default App
