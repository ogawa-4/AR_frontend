import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAR.css";

export default function ViewAR() {
  const navigate = useNavigate();
  const sceneRef = useRef();
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // DBから手紙取得
  useEffect(() => {
    fetch("https://ar-backend-yt6b.onrender.com/letters")
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error(err));
  }, []);

  // React描画後にクリックイベント登録
  useEffect(() => {
    letters.forEach((letter) => {
      const entity = document.getElementById(`letter-${letter.id}`);
      if (entity) {
        entity.addEventListener("click", () => {
          setSelectedLetter(letter);
        });
      }
    });
  }, [letters]);

  return (
    <div className="viewar-container">
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
            gps-entity-place={`latitude: ${letter.latitude}; longitude: ${letter.longitude};`}
          ></a-entity>
        ))}
      </a-scene>

      {selectedLetter && (
        <div className="modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>手紙を発見！</h2>
            <p>{selectedLetter.content}</p>
            <button onClick={() => setSelectedLetter(null)}>閉じる</button>
          </div>
        </div>
      )}

      <button className="ar-back-button" onClick={() => navigate("/")}>
        ホームに戻る
      </button>
    </div>
  );
}



