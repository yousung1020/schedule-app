import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
function Register() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd : "",
    name : "",
  });

  const localStorageKey = "userInfo";

  const nav = useNavigate();
  
  // 로그인 페이지로 이동
  const del = () => {
    nav("/");
  }

  const fin = () => {
    // 공란으로 회원가입을 시도할 경우
    if(!userInfo.id){
      alert("아이디를 입력하세요.");
      return;
    }
    if(!userInfo.pwd){
      alert("비밀번호를 입력하세요.");
      return;
    }
    if(!userInfo.name){
      alert("이름을 입력하세요.");
      return;
    }
    // 이미 로컬 스토리지에 등록된 회원일 경우
    const Users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    if(Users.some(user => user.id === userInfo.id)){
      alert("이미 등록된 회원입니다.");
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
    <form>
      <input type="text" name="id" value={userInfo.id} onChange={handleUserInfo} placeholder="아이디"/><br></br>
      <input type="password" name="pwd" value={userInfo.pwd} onChange={handleUserInfo} placeholder="비밀번호"/><br></br>
      <input type="text" name="name" value={userInfo.name} onChange={handleUserInfo} placeholder="이름"/>
    </form>
    <Button onClick={del}>취소하기</Button>
    <Button onClick={fin}>회원가입</Button>

  </div>
)
}

export default Register;