<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');

        if (!username || !password) {
            setError('ユーザ名かパスワードが入力されていません。');
            return;
        }
        // 後にAPIを実装するので、ここではダミーの処理を行う
    };

    return(
        <div className="login-container">
            <h1>ログインページ</h1>

            <input
                className="login-input"
                type="text"
                placeholder="ユーザ名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="login-input"
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-message" style={{ visibility: error ? 'visible' : 'hidden' }}>
                {error || 'エラー表示用スペース'}
            </div>
            <button className="login-button" onClick={handleLogin}>ログイン</button>

            <div className="login-link">
                <p>
                    新規ユーザは<Link to="/register">こちら</Link>
                </p>
            </div>

            <div className="button-group">
                <button className="h-button" onClick={() => navigate('/')}>ホームに戻る</button>
            </div>

        </div>
    )
}
=======
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');

        if (!username || !password) {
            setError('ユーザ名かパスワードが入力されていません。');
            return;
        }
        // 後にAPIを実装するので、ここではダミーの処理を行う
    };

    return(
        <div className="login-container">
            <h1>ログインページ</h1>

            <input
                className="login-input"
                type="text"
                placeholder="ユーザ名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="login-input"
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-message" style={{ visibility: error ? 'visible' : 'hidden' }}>
                {error || 'エラー表示用スペース'}
            </div>
            <button className="login-button" onClick={handleLogin}>ログイン</button>

            <div className="login-link">
                <p>
                    新規ユーザは<Link to="/register">こちら</Link>
                </p>
            </div>

            <div className="button-group">
                <button className="h-button" onClick={() => navigate('/')}>ホームに戻る</button>
            </div>

        </div>
    )
}
>>>>>>> 3d90229 (pc up)
