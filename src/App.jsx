import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Analytics from "./pages/Analytics";
import GenerateQR from "./pages/GenerateQR";
import Verify from "./pages/Verify";
import NGOBoard from "./pages/NGOBoard";
import NGOLogin from "./pages/NGOLogin";
import Retailer from "./pages/Retailer";
//import FarmerVoice from "./pages/FarmerVoice";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/ngo" element={<NGOBoard />} />

            <Route path="/ngo-login" element={<NGOLogin />} />

            <Route path="/retailer" element={<Retailer />} />

            <Route path="/map" element={<Map />} />

            <Route path="/analytics" element={<Analytics />} />
          {/* <Route path="/farmer" element={<FarmerVoice />} /> */}

            <Route path="/generate-qr" element={<GenerateQR />} />

            <Route path="/verify" element={<Verify />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;