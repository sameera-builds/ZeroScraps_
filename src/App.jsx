import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Retailer from "./pages/Retailer";
import MyListings from "./pages/MyListings";
import Analytics from "./pages/Analytics";
import GenerateQR from "./pages/GenerateQR";
import Verify from "./pages/Verify";
import MyShipments from "./pages/MyShipments";
import ShipmentActions from "./pages/ShipmentActions";
import NGOBoard from "./pages/NGOBoard";
import NGOLogin from "./pages/NGOLogin";

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
          <Route path="/ngo" element={<NGOBoard />} />
          <Route path="/ngo-login" element={<NGOLogin />} />
          <Route path="/retailer" element={<div className="p-10">Retailer</div>} />
          <Route path="/map" element={<div className="p-10">Map</div>} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/generate-qr" element={<GenerateQR />} />
          <Route path="/verify/:id" element={<Verify />} />
          <Route path="/my-shipments" element={<MyShipments />} />
          <Route path="/shipment-actions" element={<ShipmentActions />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
