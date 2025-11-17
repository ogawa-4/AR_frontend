import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapPlaceLetter.css";

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

export default function MapPlaceLetter() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [content, setContent] = useState("");

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("手紙の内容を書いてね。");
      return;
    }
    if (!position) {
      alert("まずマップで場所を選んで。");
      return;
    }

    const body = {
      content,
      latitude: position[0],
      longitude: position[1],
    };

    try {
      const res = await fetch("https://ar-backend-yt6b.onrender.com/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("投稿に失敗した");

      alert("手紙を置いたよ。");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("投稿できなかった。少し待ってみてくれ。");
    }
  };

  return (
    <div className="map-place-container">
      {/* 戻るボタン */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ホームへ
      </button>

      {/* マップ全画面 */}
      <MapContainer
        center={[35.681236, 139.767125]}
        zoom={15}
        className="map-fullscreen"
        style={{ width: "100%", height: "100%", zIndex: 1 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {position && <Marker position={position} icon={markerIcon} />}
      </MapContainer>

      {/* 入力パネル */}
      <div className="letter-panel" style={{ zIndex: 10 }}>
        <textarea
          placeholder="ここに手紙を書いてね。"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          この場所に置く
        </button>
      </div>
    </div>
  );
}
