import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
function Register() {
    const [userInfo, setUserInfo] = useState({
      id: "",
      pwd : "",
    });

    const localStorageKey = "userInfo";

    const nav = useNavigate();
    
    const del = () => {
      nav(`/`);
    }

    const fin = () => {
      if(!userInfo.id || !userInfo.pwd){
        alert("아이디와 비밀번호를 입력하세요.");
        return;
      }
      const Users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      if(Users.some(user => user.id === userInfo.id)){
        alert("등록된 회원입니다.");
        return;
      };
      const updateUsers = [...Users, userInfo];
      localStorage.setItem(localStorageKey,JSON.stringify(updateUsers));
      nav(`/`);
    }

    const handleUserInfo = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });

    }
  return(
    
    <div>
        <input type="text" name="id" value={userInfo.id} onChange={handleUserInfo} placeholder="아이디"/>
      <form>
        <input type="password" name="pwd" value={userInfo.pwd} onChange={handleUserInfo} placeholder="비밀번호"/>
      </form>
      <Button onClick={del}>취소하기</Button>
      <Button onClick={fin}>회원가입</Button>

    </div>
  )
}

export default Register;