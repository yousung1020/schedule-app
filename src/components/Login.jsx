import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/Login.css";

function Login(){
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
      const Users = JSON.parse(localStorage.getItem("userInfo"));
      let test = 1;
      // 사용자 이름 및 비밀번호 확인
      Users.map(function(user){
        if((user.id == userInfo.id && user.pwd == userInfo.pwd)){
          test = 0;
        }
      });
      
      if(test){
        alert("잘못된 정보를 입력하셨습니다.");
        return;
      }
      // 사용자별 고유 키 생성
      const userKey = `${userInfo.id}_${userInfo.pwd}`;

      // 사용자별 일정 정보가 없으면 빈 배열로 초기화 ( 처음 로그인한 경우)
      if (!localStorage.getItem(`user_${userKey}`)){
        localStorage.setItem(`user_${userKey}`, JSON.stringify([]));
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

            <input type="text" name="id" value={userInfo.id} onChange={handleUserInfo} placeholder='이름'/>
            <input type="text" name="pwd" value={userInfo.pwd} onChange={handleUserInfo} placeholder='비밀번호'/>
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