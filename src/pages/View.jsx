import React, { useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom'; 
import './View.css';

export default function View() {
    const navigate = useNavigate();
    const center = [35.629312, 140.189696]; //中心座標　情報大
    const [currentPosition, setCurrentPosition] = useState(null);
    const [letters, setLetters] = useState([]); //仮の手紙の位置を入れる
    const [nearbyLetters, setNearbyLetters] = useState([]); //近くの手紙の位置を入れる

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // 地球の半径（メートル）
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


    // 位置情報の取得
    useEffect(() => {
            // ダミーの手紙データ（緯度・経度付き）
        const dummyLetters = [
        { id: 1, latitude: 35.6295, longitude: 140.1900, content: '手紙その1' },
        { id: 2, latitude: 35.6280, longitude: 140.1885, content: '手紙その2' },
        { id: 3, latitude: 35.6275, longitude: 140.1920, content: 'ちょっと遠い手紙' },
        ];
        setLetters(dummyLetters);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const current = [latitude, longitude];
                setCurrentPosition(current);

                const nearby = dummyLetters.filter((letter) => {
                    const distance = getDistance(
                            latitude,
                            longitude,
                            letter.latitude,
                            letter.longitude
                        );
                        return distance <= 100000; // 100メートル以内の手紙をフィルタリング
                });
                setNearbyLetters(nearby);
            },
            (error) => {
                console.error('位置情報の取得に失敗しました:', error);
            }
        );
    }, []);

    return (
        <div className="view-container">
            <h1>手紙閲覧ページ</h1>
            <MapContainer center={center} zoom={13} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 現在位置のマーカー */}
                {currentPosition && (
                    <Marker position={currentPosition}>
                        <Popup>
                            あなたの現在位置
                        </Popup>
                    </Marker>
                )}

                {/* 近くの手紙のマーカー */}
                {nearbyLetters.map((letter, index) => (
                    <Marker key={index} position={[letter.latitude, letter.longitude]}>
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
