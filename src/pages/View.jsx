import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import './View.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// デフォルトアイコン再設定
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function View() {
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    // DBから手紙取得
    fetch('https://ar-backend-yt6b.onrender.com/letters')
      .then(res => res.json())
      .then(data => setLetters(data))
      .catch(err => console.error('手紙取得失敗:', err));

    // 現在位置取得
    navigator.geolocation.getCurrentPosition(
      pos => setCurrentPosition([pos.coords.latitude, pos.coords.longitude]),
      err => console.error('位置情報取得失敗:', err)
    );
  }, []);

  const center = currentPosition || [35.6367611, 140.2029053];

  return (
    <div className="view-container">
      <MapContainer center={center} zoom={18} className="map-fullscreen">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {currentPosition && (
          <Marker position={currentPosition}>
            <Popup>現在位置</Popup>
          </Marker>
        )}

        {letters.map(letter => (
          <Marker
            key={letter.id}
            position={[letter.latitude, letter.longitude]}
            eventHandlers={{
              click: () => setSelectedLetter(letter)
            }}
          />
        ))}
      </MapContainer>

      {/* モーダル */}
      {selectedLetter && (
        <div className="modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>手紙を発見</h2>
            <p>内容は近づいてみてね</p>
            <button onClick={() => setSelectedLetter(null)}>閉じる</button>
          </div>
        </div>
      )}

      {/* マップ上に浮かせるボタン */}
      <button className="button-back" onClick={() => navigate('/')}>
        ホームに戻る
      </button>
    </div>
  );
}
