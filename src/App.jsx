import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
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
          <Route path="/retailer" element={<div className="p-10">Retailer</div>} />
          <Route path="/map" element={<div className="p-10">Map</div>} />
          <Route path="/analytics" element={<div className="p-10">Analytics</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
