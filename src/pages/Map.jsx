import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { calculateDistance } from "../utils/distance";
import { useEffect, useState } from "react";
const retailerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const ngoIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const locations = [

  {
    id: 1,
    name: "Fresh Mart",
    type: "Retailer",
    position: [28.6139, 77.2090],
    food: "Vegetables",
    quantity: "50 kg",
    risk: "High",
  },
  {
    id: 2,
    name: "Hope Foundation",
    type: "NGO",
    position: [28.6280, 77.2180],
  },
  {
    id: 3,
    name: "Green Grocery",
    type: "Retailer",
    position: [19.0760, 72.8777],
    food: "Bakery Items",
    quantity: "30 kg",
    risk: "Medium",
  },
  {
    id: 4,
    name: "Food Care NGO",
    type: "NGO",
    position: [19.0850, 72.8950],
  },
  {
    id: 5,
    name: "Daily Needs",
    type: "Retailer",
    position: [12.9716, 77.5946],
    food: "Rice",
    quantity: "80 kg",
    risk: "Low",
  },
  {
    id: 6,
    name: "Helping Hands NGO",
    type: "NGO",
    position: [12.9800, 77.6000],
  },
];
const riskOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};
function Map() {
  const retailer = locations.find(
  (location) => location.type === "Retailer"
);

const ngo = locations.find(
  (location) => location.type === "NGO"
  
);
const distance =
  retailer && ngo
    ? calculateDistance(
        retailer.position[0],
        retailer.position[1],
        ngo.position[0],
        ngo.position[1]
      )
    : null;
const [userLocation, setUserLocation] = useState(null);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation([
        position.coords.latitude,
        position.coords.longitude,
      ]);
    },
    () => {
      console.log("Location permission denied");
    }
  );
}, []);
  return (
    <div className="min-h-screen bg-surface p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-heading text-4xl font-bold text-text">
          Food Rescue Map
        </h1>

        <p className="mt-2 font-body text-text-muted">
          Find nearby retailers and NGOs helping reduce food waste.
        </p>
<div className="mt-6 grid gap-6 lg:grid-cols-3">
  <div className="overflow-hidden rounded-xl shadow-sm lg:col-span-2">
    <MapContainer
            center={userLocation || [20.5937, 78.9629]}
            zoom={userLocation ? 12 : 5}
            className="h-[500px] w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           {[...locations].sort((a, b) => {
  const riskA = riskOrder[a.risk] || 99;
  const riskB = riskOrder[b.risk] || 99;
  return riskA - riskB;
}).map((location) => (
             
 <Marker
  key={location.id}
 position={location.position || [20.5937, 78.9629]}
  icon={location.type === "NGO" ? ngoIcon : retailerIcon}
>
    <Popup>
      <div>
        <h3>{location.name}</h3>
        <p>Type: {location.type}</p>

        {location.food && <p>Food: {location.food}</p>}
        {location.quantity && <p>Quantity: {location.quantity}</p>}
        {location.risk && <p>Risk: {location.risk}</p>}
        <p>Distance: {distance.toFixed(2)} km</p>
      </div>
    </Popup>
  </Marker>
))}
{userLocation && (
  <CircleMarker
    center={userLocation}
    radius={10}
  >
    <Popup>
      You are here
    </Popup>
  </CircleMarker>
)}
</MapContainer>

</div>
<div className="rounded-xl border bg-surface p-5 shadow-sm">
  <h2 className="font-heading text-xl font-bold text-text">
    Available NGOs
  </h2>

  <p className="mt-1 text-sm text-text-muted">
    Recommended based on distance
  </p>

  <div className="mt-4 space-y-3">
  {locations
  .filter((location) => location.type === "NGO")
  .map((ngo) => ({
    ...ngo,
    distance: userLocation
      ? calculateDistance(
          userLocation[0],
          userLocation[1],
          ngo.position[0],
          ngo.position[1]
        )
      : Infinity,
  }))
  .sort((a, b) => a.distance - b.distance)
  .map((ngo, index) => {
        

        return (
          <div
            key={ngo.id}
            className="rounded-xl border p-4"
          >
            <h3 className="font-heading font-semibold text-text">
              {index === 0 ? "⭐ " : ""}
              {ngo.name}
            </h3>

           {ngo.distance !== Infinity && (
              <p className="mt-1 text-sm text-text-muted">
                {ngo.distance.toFixed(2)} km away
              </p>
            )}

            {index === 0 && (
              <p className="mt-2 text-sm font-semibold text-brand">
                Recommended
              </p>
            )}
          </div>
        );
      })}
  </div>
</div>
</div>
</div>
</div>
);
}
export default Map;