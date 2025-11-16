//koment 

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

function MapClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    }
  });
  return null;
}

export default function MapPlaceLetter() {
  const [selectedPos, setSelectedPos] = useState(null);

  return (
    <div className="place-letter-container">
      <h2 className="title">手紙を地図に置く</h2>

      <MapContainer
        center={[35.6812, 139.7671]}
        zoom={15}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onClick={(pos) => setSelectedPos(pos)} />

        {selectedPos && (
          <Marker position={[selectedPos.lat, selectedPos.lng]}>
            <Popup>ここに置く？</Popup>
          </Marker>
        )}
      </MapContainer>

      {selectedPos && (
        <button
          className="submit-btn"
          onClick={() => console.log("投稿へ進む", selectedPos)}
        >
          この場所に手紙を置く
        </button>
      )}
    </div>
  );
}
