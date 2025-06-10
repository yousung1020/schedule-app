import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/Login.css";

function Login(){
  const localStorageKey = "userInfo";
  // 사용자 이름 및 전화번호 입력 상태
  const [userInfo, setUserInfo] = useState({
      id: "",
      pwd : "",
  });

  const nav = useNavigate(); // 특정 경로로 이동할 수 있는 함수

  const Register = () => {
    nav(`/register`);
  }

  const handleUserInfo = (e) => {
      setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value
      });

  }

  const StartCalender = () => {
    // 로컬스토리지에 아무 값도 없으면 빈 배열로 초기화
    const Users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    // 입력된 id 값과 pwd 값이 기존 로컬 스토리지에 저장된 정보와 같으면 로그인 성공!
    for(let user of Users){
      if((user.id === userInfo.id) && (user.pwd === userInfo.pwd)){
        // 사용자별 고유 키 생성
        const userKey = `${userInfo.id}_${userInfo.pwd}`;
        const loginUser = {name:user.name,id:userInfo.id,pwd:userInfo.pwd};
        localStorage.setItem(`LoginUser`,JSON.stringify(loginUser));
        // 사용자별 일정 정보가 없으면 빈 배열로 초기화 (처음 로그인한 경우)
        if (!localStorage.getItem(`${userKey}`)){
          localStorage.setItem(`${userKey}`, JSON.stringify([]));
        }

        nav("/calendar");
        return;
      }
    }
    
    // for문을 다 돌았음에도 일치하는 정보가 없으면 로그인 실패!
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    console.log("롸");
  }

  return(
    <>
      <div className='container'>
        <div className='input-section'>
          <h2>사용자 정보 입력</h2>

          <input type="text" name="id" value={userInfo.id} onChange={handleUserInfo} placeholder='아이디'/>
          <input type="password" name="pwd" value={userInfo.pwd} onChange={handleUserInfo} placeholder='비밀번호'/>
          <Button onClick={StartCalender} className='game-button'>로그인</Button>
        </div>
        <div className='el-info-section'>
          <h1>회원가입</h1>
          <Button onClick={Register} className='game-button'>Sign Up</Button>
        </div>
      </div>
        
    </>
  )
}

export default Login;
