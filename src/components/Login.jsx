import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Login.css";

function Login(){
    // 사용자 이름 및 학과 정보 입력 상태
    const [userInfo, setUserInfo] = useState({
        id: "",
        pwd: "",
    });

    const nav = useNavigate(); // 특정 경로로 이동할 수 있는 함수

    const handleUserInfo = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }

    const handelStartGame = () => {
        const queryParams = new URLSearchParams(userInfo); // 입력 데이터를 쿼리 파라미터로 변환
        nav(`/startGame?${queryParams.toString()}`); // startGame 경로로 이동하면서 데이터(사용자 정보) 전달 
    }

    return(
      <>
        <div className='container'>
          <div className='input-section'>
            <h1>사용자 정보 입력</h1>

            <input type="text" name="name" value={userInfo.name} onChange={handleUserInfo} placeholder='이름'/>
            <input type="text" name="phone" value={userInfo.phone} onChange={handleUserInfo} placeholder='전화번호'/>
            <button onClick={handelStartGame} className='game-button'>로그인</button>
          </div>
          <div className='el-info-section'>
            <h1>회원가입</h1>
          </div>
        </div>
          
      </>
    )
}

export default Login;