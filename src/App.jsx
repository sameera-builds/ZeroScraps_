import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import GenerateQR from "./pages/GenerateQR";
import Verify from "./pages/Verify";
import MyShipments from "./pages/MyShipments";
import ShipmentActions from "./pages/ShipmentActions";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ngo" element={<div className="p-10">NGO Board</div>} />
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