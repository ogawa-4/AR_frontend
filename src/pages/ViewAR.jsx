import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAR.css";

export default function ViewAR() {
  const navigate = useNavigate();
  const sceneRef = useRef();
  const [letters, setLetters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // --- ✅ viewportを確実に設定（Androidズーム防止） ---
  useEffect(() => {
    const meta = document.querySelector("meta[name='viewport']");
    if (!meta) {
      const newMeta = document.createElement("meta");
      newMeta.name = "viewport";
      newMeta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document.head.appendChild(newMeta);
    } else {
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
    }
  }, []);

  // --- 🔹 手紙を取得 ---
  useEffect(() => {
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

  // --- 🔹 手紙クリックでモーダル表示 ---
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

  // --- ✅ Android向けにリサイズ時の高さ再調整 ---
  useEffect(() => {
    const handleResize = () => {
      if (sceneRef.current) {
        sceneRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="viewar-container">
      <a-scene
        ref={sceneRef}
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          zIndex: 1,
        }}
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

      {showModal && selectedLetter && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedLetter.title || "手紙を発見！"}</h2>
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

