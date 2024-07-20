import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"

function App() {

  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppLayout />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>)
}

export default App
