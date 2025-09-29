import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import './View.css';

export default function View() {
    const navigate = useNavigate();
    const center = [35.6367611, 140.2029053]; // 基準座標（5号館）
    const [currentPosition, setCurrentPosition] = useState(null);
    const [letters, setLetters] = useState([]);
    const [nearbyLetters, setNearbyLetters] = useState([]);

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const toRad = (x) => (x * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    useEffect(() => {
        // === 5×5 の格子状にダミー手紙を作成 ===
        const baseLat = 35.6367611;
        const baseLng = 140.2029053;
        const latStep = 0.000018; // 約2m
        const lngStep = 0.000022; // 約2m

        const gridLetters = [];
        let idCounter = 1;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                gridLetters.push({
                    id: idCounter,
                    latitude: baseLat + (i - 2) * latStep,
                    longitude: baseLng + (j - 2) * lngStep,
                    content: `テスト手紙 ${idCounter}`,
                });
                idCounter++;
            }
        }
        setLetters(gridLetters);

        // === 現在位置を取得 ===
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const current = [latitude, longitude];
                setCurrentPosition(current);

                // 一旦 1km 以内なら全部表示（テスト用）
                const nearby = gridLetters.filter((letter) => {
                    const distance = getDistance(
                        latitude,
                        longitude,
                        letter.latitude,
                        letter.longitude
                    );
                    return distance <= 1000;
                });
                setNearbyLetters(nearby);
            },
            (error) => {
                console.error('位置情報の取得に失敗しました:', error);
                // 位置情報が取れない場合は全部表示
                setNearbyLetters(gridLetters);
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

                {/* 現在位置 */}
                {currentPosition && (
                    <Marker position={currentPosition}>
                        <Popup>あなたの現在位置</Popup>
                    </Marker>
                )}

                {/* 手紙のマーカー */}
                {nearbyLetters.map((letter) => (
                    <Marker key={letter.id} position={[letter.latitude, letter.longitude]}>
                        <Popup>
                            <strong>{letter.content}</strong><br />
                            緯度: {letter.latitude.toFixed(6)}<br />
                            経度: {letter.longitude.toFixed(6)}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="button-group">
                <button className="button" onClick={() => navigate('/')}>
                    ホームに戻る
                </button>
            </div>
        </div>
    );
}
