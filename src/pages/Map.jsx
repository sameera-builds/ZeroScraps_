import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { calculateDistance } from "../utils/distance";
import { useLanguage } from "../context/LanguageContext";

// Marker icons
const retailerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ngoIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Demo locations
const locations = [
  {
    id: 1,
    name: "Fresh Mart",
    type: "Retailer",
    city: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    food: "Vegetables",
    quantity: 50,
    risk: "High",
  },
  {
    id: 2,
    name: "Hope Foundation",
    type: "NGO",
    city: "Delhi",
    lat: 28.5355,
    lng: 77.391,
  },
  {
    id: 3,
    name: "Green Grocery",
    type: "Retailer",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    food: "Bakery Items",
    quantity: 30,
    risk: "Medium",
  },
  {
    id: 4,
    name: "Food Care NGO",
    type: "NGO",
    city: "Mumbai",
    lat: 19.0178,
    lng: 73.057,
  },
  {
    id: 5,
    name: "Daily Needs",
    type: "Retailer",
    city: "Bangalore",
    lat: 12.9716,
    lng: 77.5946,
    food: "Rice",
    quantity: 80,
    risk: "Low",
  },
  {
    id: 6,
    name: "Helping Hands NGO",
    type: "NGO",
    city: "Bangalore",
    lat: 13.0827,
    lng: 80.2707,
  },
];

// Map translations
const mapTranslations = {
  English: {
    title: "Food Rescue Map",
    subtitle:
      "Find nearby retailers and NGOs helping reduce food waste.",
    availableNGOs: "Available NGOs",
    recommendedBasedOnDistance: "Recommended based on distance",
    recommended: "Recommended",
    away: "away",
    youAreHere: "You are here",
    type: "Type",
    food: "Food",
    quantity: "Quantity",
    risk: "Risk",
    distance: "Distance",
    retailer: "Retailer",
    ngo: "NGO",
    kg: "kg",
    high: "High",
    medium: "Medium",
    low: "Low",
    vegetables: "Vegetables",
    bakeryItems: "Bakery Items",
    rice: "Rice",
  },

  हिन्दी: {
    title: "भोजन बचाव मानचित्र",
    subtitle:
      "भोजन की बर्बादी कम करने वाले नजदीकी रिटेलरों और NGO को खोजें।",
    availableNGOs: "उपलब्ध NGO",
    recommendedBasedOnDistance: "दूरी के आधार पर अनुशंसित",
    recommended: "अनुशंसित",
    away: "दूर",
    youAreHere: "आप यहाँ हैं",
    type: "प्रकार",
    food: "भोजन",
    quantity: "मात्रा",
    risk: "जोखिम",
    distance: "दूरी",
    retailer: "रिटेलर",
    ngo: "NGO",
    kg: "किग्रा",
    high: "उच्च",
    medium: "मध्यम",
    low: "कम",
    vegetables: "सब्जियाँ",
    bakeryItems: "बेकरी उत्पाद",
    rice: "चावल",
  },

  বাংলা: {
    title: "খাদ্য উদ্ধার মানচিত্র",
    subtitle:
      "খাদ্যের অপচয় কমাতে সাহায্যকারী কাছাকাছি রিটেইলার এবং NGO খুঁজুন।",
    availableNGOs: "উপলব্ধ NGO",
    recommendedBasedOnDistance: "দূরত্ব অনুযায়ী সুপারিশকৃত",
    recommended: "সুপারিশকৃত",
    away: "দূরে",
    youAreHere: "আপনি এখানে",
    type: "ধরন",
    food: "খাবার",
    quantity: "পরিমাণ",
    risk: "ঝুঁকি",
    distance: "দূরত্ব",
    retailer: "রিটেইলার",
    ngo: "NGO",
    kg: "কেজি",
    high: "উচ্চ",
    medium: "মাঝারি",
    low: "কম",
    vegetables: "সবজি",
    bakeryItems: "বেকারি পণ্য",
    rice: "চাল",
  },

  தமிழ்: {
    title: "உணவு மீட்பு வரைபடம்",
    subtitle:
      "உணவு வீணாவதை குறைக்க உதவும் அருகிலுள்ள சில்லறை விற்பனையாளர்கள் மற்றும் NGOகளை கண்டறியுங்கள்.",
    availableNGOs: "கிடைக்கும் NGOகள்",
    recommendedBasedOnDistance:
      "தூரத்தின் அடிப்படையில் பரிந்துரைக்கப்படுகிறது",
    recommended: "பரிந்துரைக்கப்படுகிறது",
    away: "தொலைவில்",
    youAreHere: "நீங்கள் இங்கே உள்ளீர்கள்",
    type: "வகை",
    food: "உணவு",
    quantity: "அளவு",
    risk: "ஆபத்து",
    distance: "தூரம்",
    retailer: "சில்லறை விற்பனையாளர்",
    ngo: "NGO",
    kg: "கிலோ",
    high: "அதிகம்",
    medium: "நடுத்தரம்",
    low: "குறைவு",
    vegetables: "காய்கறிகள்",
    bakeryItems: "பேக்கரி பொருட்கள்",
    rice: "அரிசி",
  },

  తెలుగు: {
    title: "ఆహార రక్షణ మ్యాప్",
    subtitle:
      "ఆహార వ్యర్థాలను తగ్గించడంలో సహాయపడే సమీప రిటైలర్లు మరియు NGOలను కనుగొనండి.",
    availableNGOs: "అందుబాటులో ఉన్న NGOలు",
    recommendedBasedOnDistance: "దూరం ఆధారంగా సిఫార్సు చేయబడింది",
    recommended: "సిఫార్సు చేయబడింది",
    away: "దూరంలో",
    youAreHere: "మీరు ఇక్కడ ఉన్నారు",
    type: "రకం",
    food: "ఆహారం",
    quantity: "పరిమాణం",
    risk: "ప్రమాదం",
    distance: "దూరం",
    retailer: "రిటైలర్",
    ngo: "NGO",
    kg: "కిలోలు",
    high: "అధిక",
    medium: "మధ్యస్థ",
    low: "తక్కువ",
    vegetables: "కూరగాయలు",
    bakeryItems: "బేకరీ వస్తువులు",
    rice: "బియ్యం",
  },

  मराठी: {
    title: "अन्न बचाव नकाशा",
    subtitle:
      "अन्नाची नासाडी कमी करण्यासाठी मदत करणारे जवळचे रिटेलर आणि NGO शोधा.",
    availableNGOs: "उपलब्ध NGO",
    recommendedBasedOnDistance: "अंतरानुसार शिफारस केलेले",
    recommended: "शिफारस केलेले",
    away: "अंतरावर",
    youAreHere: "तुम्ही येथे आहात",
    type: "प्रकार",
    food: "अन्न",
    quantity: "प्रमाण",
    risk: "जोखीम",
    distance: "अंतर",
    retailer: "रिटेलर",
    ngo: "NGO",
    kg: "किलो",
    high: "उच्च",
    medium: "मध्यम",
    low: "कमी",
    vegetables: "भाज्या",
    bakeryItems: "बेकरी पदार्थ",
    rice: "तांदूळ",
  },

  ગુજરાતી: {
    title: "ખોરાક બચાવ નકશો",
    subtitle:
      "ખોરાકનો બગાડ ઘટાડવામાં મદદ કરતા નજીકના રિટેલર્સ અને NGO શોધો.",
    availableNGOs: "ઉપલબ્ધ NGO",
    recommendedBasedOnDistance: "અંતરના આધારે ભલામણ કરેલ",
    recommended: "ભલામણ કરેલ",
    away: "દૂર",
    youAreHere: "તમે અહીં છો",
    type: "પ્રકાર",
    food: "ખોરાક",
    quantity: "જથ્થો",
    risk: "જોખમ",
    distance: "અંતર",
    retailer: "રિટેલર",
    ngo: "NGO",
    kg: "કિગ્રા",
    high: "ઉચ્ચ",
    medium: "મધ્યમ",
    low: "ઓછું",
    vegetables: "શાકભાજી",
    bakeryItems: "બેકરી વસ્તુઓ",
    rice: "ચોખા",
  },
};

// Translate values
function translateValue(value, t) {
  const translations = {
    Vegetables: t.vegetables,
    "Bakery Items": t.bakeryItems,
    Rice: t.rice,
    High: t.high,
    Medium: t.medium,
    Low: t.low,
    Retailer: t.retailer,
    NGO: t.ngo,
  };

  return translations[value] || value;
}

function Map() {
  const { language } = useLanguage();

  const t =
    mapTranslations[language] || mapTranslations.English;

  const [userLocation, setUserLocation] = useState(null);

  // Get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("Location permission denied.");
      }
    );
  }, []);

  // Calculate NGO distances
  const ngos = locations
    .filter((location) => location.type === "NGO")
    .map((ngo) => {
      let distance = null;

      if (userLocation) {
        distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          ngo.lat,
          ngo.lng
        );
      }

      return {
        ...ngo,
        distance,
      };
    })
    .sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;

      return a.distance - b.distance;
    });

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [20.5937, 78.9629];

  return (
    <div className="min-h-screen bg-[#faf9f6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t.title}
          </h1>

          <p className="mt-2 text-lg text-gray-500">
            {t.subtitle}
          </p>
        </div>

        {/* MAP + NGO PANEL */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* MAP */}
          <div className="h-[500px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <MapContainer
              center={center}
              zoom={userLocation ? 12 : 5}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* USER LOCATION */}
              {userLocation && (
                <CircleMarker
                  center={[
                    userLocation.lat,
                    userLocation.lng,
                  ]}
                  radius={9}
                  pathOptions={{
                    color: "#2563eb",
                    fillColor: "#3b82f6",
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>{t.youAreHere}</Popup>
                </CircleMarker>
              )}

              {/* LOCATIONS */}
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={
                    location.type === "Retailer"
                      ? retailerIcon
                      : ngoIcon
                  }
                >
                  <Popup>
                    <div className="min-w-[180px]">
                      <h3 className="text-base font-bold">
                        {location.name}
                      </h3>

                      <p className="mt-1 text-sm">
                        <strong>{t.type}:</strong>{" "}
                        {translateValue(location.type, t)}
                      </p>

                      <p className="text-sm">
                        <strong>{location.city}</strong>
                      </p>

                      {location.type === "Retailer" && (
                        <>
                          <p className="mt-2 text-sm">
                            <strong>{t.food}:</strong>{" "}
                            {translateValue(location.food, t)}
                          </p>

                          <p className="text-sm">
                            <strong>{t.quantity}:</strong>{" "}
                            {location.quantity} {t.kg}
                          </p>

                          <p className="text-sm">
                            <strong>{t.risk}:</strong>{" "}
                            {translateValue(location.risk, t)}
                          </p>
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* NGO PANEL */}
          <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              {t.availableNGOs}
            </h2>

            <p className="mt-1 text-gray-500">
              {t.recommendedBasedOnDistance}
            </p>

            <div className="mt-5 space-y-3">
              {ngos.map((ngo, index) => (
                <div
                  key={ngo.id}
                  className="rounded-xl border border-gray-300 p-4"
                >
                  <div className="flex items-center gap-2">
                    {index === 0 && userLocation && (
                      <span className="text-lg">⭐</span>
                    )}

                    <h3 className="font-semibold text-gray-900">
                      {ngo.name}
                    </h3>
                  </div>

                  {ngo.distance !== null && (
                    <p className="mt-2 text-sm text-gray-500">
                      {ngo.distance.toFixed(2)} km {t.away}
                    </p>
                  )}

                  {index === 0 && userLocation && (
                    <p className="mt-2 font-semibold text-green-700">
                      {t.recommended}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Map;