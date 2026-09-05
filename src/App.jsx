import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/home";
import Map from "./pages/Map";
import Retailer from "./pages/Retailer";
import MyListings from "./pages/MyListings";
import Analytics from "./pages/Analytics";
import GenerateQR from "./pages/GenerateQR";
import Verify from "./pages/Verify";
import NGOBoard from "./pages/NGOBoard";
import NGOLogin from "./pages/NGOLogin";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/ngo" element={<NGOBoard />} />
          <Route path="/ngo-login" element={<NGOLogin />} />

          <Route path="/retailer" element={<Retailer />} />
          <Route path="/my-listings" element={<MyListings />} />

          <Route path="/map" element={<Map />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/generate-qr" element={<GenerateQR />} />
          <Route path="/verify/:id" element={<Verify />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

