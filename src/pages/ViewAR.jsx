import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAR.css";

export default function ViewAR() {
  const navigate = useNavigate();
  const sceneRef = useRef();
  const [letters, setLetters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    // --- 🔹 APIから手紙を取得 ---
    fetch("https://ar-backend-yt6b.onrender.com/letters")
      .then((res) => {
        if (!res.ok) throw new Error("API接続に失敗しました");
        return res.json();
      })
      .then((data) => {
        console.log("取得した手紙データ:", data);
        setLetters(data);
      })
      .catch((err) => console.error("エラー:", err));
  }, []);

  useEffect(() => {
    // --- 🔹 クリックイベントを各手紙に追加 ---
    letters.forEach((letter) => {
      const entity = document.getElementById(`letter-${letter.id}`);
      if (entity) {
        entity.addEventListener("click", () => {
          setSelectedLetter(letter);
          setShowModal(true);
        });
      }
    });
  }, [letters]);

  return (
    <div>
      <a-scene
        ref={sceneRef}
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-camera gps-camera rotation-reader>
          <a-cursor></a-cursor>
        </a-camera>

        {/* --- 🔹 DBから取得した手紙をARに表示 --- */}
        {letters.map((letter) => (
          <a-entity
            key={letter.id}
            id={`letter-${letter.id}`}
            gltf-model="url(/models/letter.glb)"
            scale="3 3 3"
            gps-entity-place={`latitude: ${letter.latitude}; longitude: ${letter.longitude};`}
          ></a-entity>
        ))}
      </a-scene>

      {/* --- モーダル --- */}
      {showModal && selectedLetter && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedLetter.title}</h2>
            <p>{selectedLetter.content}</p>
            <button onClick={() => setShowModal(false)}>閉じる</button>
          </div>
        </div>
      )}

      <button className="ar-back-button" onClick={() => navigate("/")}>
        ホームに戻る
      </button>
    </div>
  );
}


