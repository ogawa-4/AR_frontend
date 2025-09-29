import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAR.css";

export default function ViewAR() {
  const navigate = useNavigate();
  const sceneRef = useRef();
  const [showModal, setShowModal] = useState(false);

  // 仮データ：手紙を置く座標
  const letters = [
    {
      id: 1,
      title: "テスト手紙",
      lat: 35.6895, // 新宿駅あたり
      lng: 139.6917,
    },
  ];

  useEffect(() => {
    const letter = document.getElementById("letter-model");
    if (letter) {
      letter.addEventListener("click", () => {
        setShowModal(true);
      });
    }
  }, []);

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

        {letters.map((letter) => (
          <a-entity
            key={letter.id}
            id="letter-model"
            gltf-model="url(/models/letter.glb)"
            scale="3 3 3"
            gps-entity-place={`latitude: ${letter.lat}; longitude: ${letter.lng};`}
          ></a-entity>
        ))}
      </a-scene>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>手紙</h2>
            <p>
              {letters[0].title}<br />
              ここに手紙の内容が表示されます。
            </p>
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

