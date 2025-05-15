import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const locationsData = [
  {
    id: 1,
    name: "Downtown Office",
    address: "123 Main Street, Automotive City, AC 12345",
    phone: "+1 (123) 456-7890",
    email: "downtown@carrental.com",
    hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM",
    region: "North",
    features: ["Airport Shuttle", "24/7 Drop-off", "Luxury Vehicles", "Electric Vehicles"],
    image: "/Locations.jpg?height=300&width=500",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Nagpur Central Branch",
    address: "Kingsway Rd, Nagpur, Maharashtra",
    phone: "0712-1234567",
    email: "nagpur@carrental.com",
    hours: "Mon-Sun: 9AM-9PM",
    region: "Maharashtra",
    features: ["24/7 Drop-off", "Economy Cars"],
    image: "/Locations.jpg?height=300&width=500",
    lat: 21.1458,
    lng: 79.0882,
  },
  {
    id: 3,
    name: "Pune Airport Branch",
    address: "Airport Rd, Pune, Maharashtra",
    phone: "020-2345678",
    email: "pune@carrental.com",
    hours: "Mon-Sun: 8AM-10PM",
    region: "Maharashtra",
    features: ["Airport Pickup", "Luxury Vehicles"],
    image: "/Locations.jpg?height=300&width=500",
    lat: 18.5679,
    lng: 73.9143,
  },
  {
    id: 4,
    name: "Bangalore City Branch",
    address: "MG Road, Bangalore, Karnataka",
    phone: "080-8765432",
    email: "bangalore@carrental.com",
    hours: "Mon-Sat: 8AM-8PM",
    region: "Karnataka",
    features: ["Electric Vehicles", "Luxury Vehicles"],
    image: "/Locations.jpg?height=300&width=500",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: 5,
    name: "Hyderabad Hitech City",
    address: "Hitech City, Hyderabad",
    phone: "040-7654321",
    email: "hyderabad@carrental.com",
    hours: "Mon-Fri: 7AM-9PM, Sat-Sun: 8AM-6PM",
    region: "Telangana",
    features: ["24/7 Drop-off", "Airport Shuttle", "Self-drive"],
    image: "/Locations.jpg?height=300&width=500",
    lat: 17.4504,
    lng: 78.3803,
  },
  // {
  //   id: 6,
  //   name: "Mumbai Marine Drive",
  //   address: "Marine Drive, Mumbai, Maharashtra",
  //   phone: "022-1234567",
  //   email: " mumbai@carrental.com",
  //   hours: "Mon-Sun: 9AM-9PM",
  //   region: "Maharashtra",
  //   features: ["Luxury Vehicles", "Self-drive"],
  //   image: "/Locations.jpg?height=300&width=500",
  //   lat: 18.975,
  //   lng: 72.8258,
  // },

];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 19.7515,
  lng: 75.7139,
};

const LocationsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const regions = ["All", ...new Set(locationsData.map((loc) => loc.region))];

  const filteredLocations =
    selectedRegion === "All"
      ? locationsData
      : locationsData.filter((loc) => loc.region === selectedRegion);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Our Locations</h1>

      {/* Filter Buttons */}
      <div className="mb-4 flex justify-center gap-2 flex-wrap">
        {regions.map((region) => (
          <button
            key={region}
            className={`px-4 py-2 rounded-full ${
              selectedRegion === region
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5.5}
        center={center}
      >
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.lat,
              lng: selectedLocation.lng,
            }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="max-w-xs">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h2 className="font-semibold">{selectedLocation.name}</h2>
              <p className="text-sm">{selectedLocation.address}</p>
              <p className="text-sm text-gray-500">📞 {selectedLocation.phone}</p>
              <p className="text-sm text-gray-500">✉️ {selectedLocation.email}</p>
              <p className="text-sm text-gray-500">🕒 {selectedLocation.hours}</p>
              <ul className="mt-2 list-disc list-inside text-xs text-blue-600">
                {selectedLocation.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Locations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold mb-1">{location.name}</h3>
            <p className="text-gray-700">{location.address}</p>
            <p className="text-sm text-gray-500">{location.region}</p>
            <p className="text-sm text-gray-600 mt-1">📞 {location.phone}</p>
            <p className="text-sm text-gray-600">✉️ {location.email}</p>
            <p className="text-sm text-gray-600">🕒 {location.hours}</p>
            <div className="mt-2">
              {location.features.map((feat, i) => (
                <span
                  key={i}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
