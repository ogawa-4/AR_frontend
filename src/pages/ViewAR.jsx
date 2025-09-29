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
const latStep = 0.000045; // 約5m
const lngStep = 0.000055; // 約5m


  // 手紙を1つずつ個別に定義
  const letter1 = {
    id: 1,
    title: "テスト手紙 1",
    lat: baseLat - 2 * latStep,
    lng: baseLng - 2 * lngStep,
  };

  const letter2 = {
    id: 2,
    title: "テスト手紙 2",
    lat: baseLat - 2 * latStep,
    lng: baseLng - 1 * lngStep,
  };

  const letter3 = {
    id: 3,
    title: "テスト手紙 3",
    lat: baseLat - 2 * latStep,
    lng: baseLng,
  };

  const letter4 = {
    id: 4,
    title: "テスト手紙 4",
    lat: baseLat - 2 * latStep,
    lng: baseLng + 1 * lngStep,
  };

  const letter5 = {
    id: 5,
    title: "テスト手紙 5",
    lat: baseLat - 2 * latStep,
    lng: baseLng + 2 * lngStep,
  };

  const letters = [letter1, letter2, letter3, letter4, letter5]; // 今は1行目だけテスト

  useEffect(() => {
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


