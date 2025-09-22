import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAR.css";

export default function ViewAR() {
  const navigate = useNavigate();
  const sceneRef = useRef();
  const [showModal, setShowModal] = useState(false);

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
      <a-scene ref={sceneRef} vr-mode-ui="enabled: false" embedded>
        <a-camera gps-camera rotation-reader>{/* 位置・向きの取得コンポーネント */}
          <a-cursor></a-cursor>{/* 視線で手紙をタッチするカーソル作成 */}
        </a-camera>
        {/* a-cameraでgps-cameraを使用しているからカメラ位置がGPSで更新される */}

        <a-entity
          gltf-model="url(/models/letter.glb)"
          scale="3 3 3"
          id="letter-model"
          position="0 1.2 -4"
        ></a-entity>
      </a-scene>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>手紙</h2>
            <p>
              ここに手紙の内容が表示されます。<br />
              日本語もOK、長文もOKです。<br />
              Eigono tesuto<br />
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
