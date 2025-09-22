<<<<<<< HEAD
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Post.css';

export default function Post() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');//手紙内容保持
    
    //送信ボタンが押されたとき、入力が空のときの処理
    const handleSubmit = () => {
        if (!content.trim()) {
            alert('手紙の内容を入力してね。');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const letter = {
                    content,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: Date.now(),
                };

                const existing = JSON.parse(localStorage.getItem("letters")) || "[]";

                localStorage.setItem("letters", JSON.stringify([...existing, letter]));

                alert('手紙が投稿されました！');
                navigate('/');
            },
            (error) => {
                alert('位置情報の取得に失敗しました...');
                console.error(error);
            }
        );
    };

    return (
        <div className="post-container">
            <h1>手紙を残すページ</h1>

            {/* 手紙内容入力欄 */}
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
=======
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Post.css';

export default function Post() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');//手紙内容保持
    
    //送信ボタンが押されたとき、入力が空のときの処理
    const handleSubmit = () => {
        if (!content.trim()) {
            alert('手紙の内容を入力してね。');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const letter = {
                    content,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: Date.now(),
                };

                const existing = JSON.parse(localStorage.getItem("letters")) || "[]";

                localStorage.setItem("letters", JSON.stringify([...existing, letter]));

                alert('手紙が投稿されました！');
                navigate('/');
            },
            (error) => {
                alert('位置情報の取得に失敗しました...');
                console.error(error);
            }
        );
    };

    return (
        <div className="post-container">
            <h1>手紙を残すページ</h1>

            {/* 手紙内容入力欄 */}
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
>>>>>>> 3d90229 (pc up)
