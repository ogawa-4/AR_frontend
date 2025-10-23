import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css';

export default function Post() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (!content.trim()) {
            alert('手紙の内容を入力してね。');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const letterData = {
                    content: content,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                // 🔹 FastAPIにPOST
                fetch('https://ar-backend-yt6b.onrender.com/letters', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(letterData),
                })
                    .then((res) => {
                        if (!res.ok) throw new Error('サーバーエラー');
                        return res.json();
                    })
                    .then(() => {
                        alert('手紙が投稿されました！');
                        navigate('/');
                    })
                    .catch((err) => {
                        console.error(err);
                        alert('投稿に失敗しました...');
                    });
            },
            (error) => {
                console.error(error);
                alert('位置情報の取得に失敗しました...');
            }
        );
    };

    return (
        <div className="post-container">
            <h1>手紙を残すページ</h1>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="ここに手紙の内容を入力してね"
            />
            <div className="button-group">
                <button className="button" onClick={handleSubmit}>そうしん</button>
                <button className="button" onClick={() => navigate('/')}>ホームに戻る</button>
            </div>
        </div>
    );
}
