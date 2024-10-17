import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { lazy } from "react";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";


//each page will load when needed
const Homepage = lazy(() => import("./pages/Homepage"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Product = lazy(() => import("./pages/Product"))
const AppLayout = lazy(() => import("./pages/AppLayout"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const Login = lazy(() => import("./pages/Login"))



function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        {/* when a page is being loaded */}
          <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            {/* use element because you can  pass props */}
            <Route index element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>}>
              {/* Nested Routes/child routes */}
              {/* Redirects to cities when the path is activated. also don't forget index and replace + Navigate */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider >
    </AuthProvider>
  );
}

export default App;
