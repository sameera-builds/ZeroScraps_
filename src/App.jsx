import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Retailer from "./pages/Retailer";
import MyListings from "./pages/MyListings";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/ngo"
            element={
              <div className="min-h-screen p-10">
                <h1 className="text-3xl font-bold">NGO Board</h1>
              </div>
            }
          />

          <Route path="/retailer" element={<Retailer />} />

          <Route path="/my-listings" element={<MyListings />} />

          <Route
            path="/map"
            element={
              <div className="min-h-screen p-10">
                <h1 className="text-3xl font-bold">Map</h1>
              </div>
            }
          />

          <Route
            path="/analytics"
            element={
              <div className="min-h-screen p-10">
                <h1 className="text-3xl font-bold">Analytics</h1>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;