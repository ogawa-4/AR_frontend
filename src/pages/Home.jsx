import React from 'react';
import { useNavigate } from 'react-router-dom';  //画面遷移用関数の定義
import './Home.css';  

//他の場所で使えるようにreactコンポーネントを作成
export default function Home() {
    const navigate = useNavigate();//画面遷移用のフックをnavigate変数に格納

    return (
        <div className="home-container">
            <h1>インターネット<br/><center>置き手紙</center></h1>
            <div className="button-group">
                <button className="button" onClick={() => navigate('/register')}>ユーザ登録</button>
                <button className="button" onClick={() => navigate('/login')}>ログイン</button>
                <button className="button" onClick={() => navigate('/view')}>手紙を閲覧する</button>
                <button className="button" onClick={() => navigate('/post')}>手紙を残す</button>
                <button className="button" onClick={() => navigate('/view-ar')}>ARで手紙を閲覧する</button>
            </div>
        </div>
    );
}