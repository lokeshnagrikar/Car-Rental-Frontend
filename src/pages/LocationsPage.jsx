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
    name: "Nagpur Central Branch",
    region: "Maharashtra",
    lat: 21.1458,
    lng: 79.0882,
    address: "Kingsway Rd, Nagpur, Maharashtra",
    contact: "0712-1234567",
  },
  {
    id: 2,
    name: "Pune Airport Branch",
    region: "Maharashtra",
    lat: 18.5679,
    lng: 73.9143,
    address: "Airport Rd, Pune, Maharashtra",
    contact: "020-2345678",
  },
  {
    id: 3,
    name: "Bangalore City Branch",
    region: "Karnataka",
    lat: 12.9716,
    lng: 77.5946,
    address: "MG Road, Bangalore, Karnataka",
    contact: "080-8765432",
  },
  {
    id: 4,
    name: "Hyderabad Hitech City",
    region: "Telangana",
    lat: 17.4504,
    lng: 78.3803,
    address: "Hitech City, Hyderabad",
    contact: "040-7654321",
  },
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
    googleMapsApiKey: "AIzaSyAXvLxuBrIbVUAG3VCWkG5r_JsbMlbg1Xc"
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

      {/* Filter */}
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
            <div>
              <h2 className="font-semibold">{selectedLocation.name}</h2>
              <p>{selectedLocation.address}</p>
              <p className="text-sm text-gray-500">{selectedLocation.contact}</p>
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
            <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
            <p className="text-gray-700">{location.address}</p>
            <p className="text-sm text-gray-500">{location.region}</p>
            <p className="mt-1 text-blue-600 font-medium">
              📞 {location.contact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
