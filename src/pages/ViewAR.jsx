import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAR.css";

export default function ViewAR() {
  const navigate = useNavigate();
  const sceneRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // 基準座標（5号館）
  const baseLat = 35.6367611;
  const baseLng = 140.2029053;
  const latStep = 0.000018; // 約2m
  const lngStep = 0.000022; // 約2m

  // 5×5の格子状に手紙を生成
  const letters = [];
  let idCounter = 1;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      letters.push({
        id: idCounter,
        title: `テスト手紙 ${idCounter}`,
        lat: baseLat + (i - 2) * latStep, // 中心から上下に配置
        lng: baseLng + (j - 2) * lngStep, // 中心から左右に配置
      });
      idCounter++;
    }
  }

  useEffect(() => {
    // 全ての手紙にクリックイベントを付与
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

        {letters.map((letter) => (
          <a-entity
            key={letter.id}
            id={`letter-${letter.id}`}
            gltf-model="url(/models/letter.glb)"
            scale="3 3 3"
            gps-entity-place={`latitude: ${letter.lat}; longitude: ${letter.lng};`}
          ></a-entity>
        ))}
      </a-scene>

      {showModal && selectedLetter && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedLetter.title}</h2>
            <p>
              この手紙は {selectedLetter.lat.toFixed(6)}, {selectedLetter.lng.toFixed(6)} にあります。
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

