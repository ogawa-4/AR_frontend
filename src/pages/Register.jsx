import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Register.css';

export default function Register() {
    const [username,useUsername] = useState('');
    const [password, usePassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');

        if (!username && !password) {
            setError('ユーザ名とパスワードを入力してください。');
            return;
        }else if (!username){
            setError('ユーザ名を入力してください。');
            return;
        }else if (!password){
            setError('パスワードを入力してください。');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if(response.ok){
                navigate('/login');
            }else{
                setError(data.detail || '登録に失敗しました。');
            }
        }catch(err){
            setError('サーバに接続できませんでした。');
        }
    };



    return (
        <div className="register-container">
            <h1>ユーザ登録</h1>
            <input
                className="register-input"
                type="text"
                placeholder="ユーザ名"
                value={username}
                onChange={(e) => useUsername(e.target.value)}
            />
            <input
                className="register-input"
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => usePassword(e.target.value)}
            />
            <div className="error-message" style={{ visibility: error ? 'visible' : 'hidden' }}>
                {error || 'エラー表示用スペース'}
            </div>

            <div className="button-group">
                <button className="button-t" onClick={handleRegister}>とうろく</button>
            </div>
            <div className="button-home">
                <button className="button" onClick={() => navigate('/')}>ホームに戻る</button>
            </div>
        </div>
    );
}