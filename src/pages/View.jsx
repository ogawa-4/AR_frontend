import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import './View.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// デフォルトアイコンを再設定
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function View() {
    const navigate = useNavigate();
    const center = [35.6367611, 140.2029053]; // 5号館を中心に
    const [currentPosition, setCurrentPosition] = useState(null);
    const [nearbyLetters, setNearbyLetters] = useState([]); // 今はフィルタせず全手紙をここに入れる

    useEffect(() => {
        // 基準点
        const baseLat = 35.6367611; 
        const baseLng = 140.2029053;

        // 約2mを度に変換（ざっくり）
        const deltaLat = 2 / 111320; 
        const deltaLng = 2 / (111320 * Math.cos(baseLat * Math.PI / 180));

        // 5×5 の手紙を生成
        const gridLetters = [];
        let id = 1;
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                gridLetters.push({
                    id: id,
                    latitude: baseLat + i * deltaLat,
                    longitude: baseLng + j * deltaLng,
                    content: `グリッド手紙 ${id}`
                });
                id++;
            }
        }

        setNearbyLetters(gridLetters); // 全部表示

        // 現在位置取得
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition([latitude, longitude]);
            },
            (error) => {
                console.error('位置情報の取得に失敗しました:', error);
            }
        );
    }, []);

    return (
        <div className="view-container">
            <h1>手紙閲覧ページ</h1>
            <MapContainer center={center} zoom={18} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 現在位置マーカー */}
                {currentPosition && (
                    <Marker position={currentPosition}>
                        <Popup>あなたの現在位置</Popup>
                    </Marker>
                )}

                {/* 5×5 の手紙マーカー */}
                {nearbyLetters.map((letter) => (
                    <Marker key={letter.id} position={[letter.latitude, letter.longitude]}>
                        <Popup>
                            <strong>手紙</strong><br />
                            {letter.content}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="button-group">
                <button className="button" onClick={() => navigate('/')}>ホームに戻る</button>
            </div>
        </div>
    );
}

