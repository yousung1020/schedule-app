import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-bootstrap"
import "../css/Login.css";

function Login(){
    // 사용자 이름 및 전화번호 입력 상태
    const [userInfo, setUserInfo] = useState({
        name: "",
        phone: "",
    });

    const nav = useNavigate(); // 특정 경로로 이동할 수 있는 함수

    const handleUserInfo = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = () => {
      // 비구조화 할당
      const {name, phone} = userInfo;

      // 사용자별 고유 키 생성
      const userKey = `${name}_${phone}`;
      // 현재 로그인 사용자 정보 저장
      localStorage.setItem('userName',userInfo.name);
      localStorage.setItem('userPhone',userInfo.phone);

      // 사용자별 일정 정보가 없으면 빈 배열로 초기화 ( 처음 로그인한 경우)
      if (!localStorage.getItem(`schedule_${userKey}`)){
        localStorage.setItem(`schedule_${userKey}`, JSON.stringify([]));
      }

      // 쿼리 파라미터 전달하면서 페이지 이동
      const queryParams = new URLSearchParams(userInfo);
      nav(`/calendar?${queryParams.toString()}`);
    }

    return(
      <>
        <div className='container'>
          <div className='input-section'>
            <h2>사용자 정보 입력</h2>

            <input type="text" name="name" value={userInfo.name} onChange={handleUserInfo} placeholder='이름'/>
            <input type="text" name="phone" value={userInfo.phone} onChange={handleUserInfo} placeholder='전화번호'/>
            <button onClick={handleLogin} className='btn btn-primary'>로그인</button>
            <button onClick={handleLogin} className='btn btn-primary'>회원가입</button>
          </div>
          <div className='el-info-section'>
            <h1>회원가입</h1>
          </div>
        </div>
          
      </>
    )
}

export default Login;