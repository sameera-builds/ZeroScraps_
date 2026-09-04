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
            element={<div className="p-10">NGO Board</div>}
          />

          <Route path="/retailer" element={<Retailer />} />

          <Route path="/my-listings" element={<MyListings />} />

          <Route
            path="/map"
            element={<div className="p-10">Map</div>}
          />

          <Route
            path="/analytics"
            element={<div className="p-10">Analytics</div>}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;