import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import '../css/Register.css'
import usePageTitle from "../hooks/usePageTitle";

function Register() {
  usePageTitle("회원가입 페이지");
  const [error, setError] = useState({
    id: "",
    pwd: "",
    name: "",
  })
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
    let hasError = false;
    const errors = { id:"",pwd:"",name:""};
    // 공란으로 회원가입을 시도할 경우
    if(!userInfo.id){
      errors.id = "아이디를 입력하세요.";
      hasError = true;
    }
    if(!userInfo.pwd){
      errors.pwd = "비밀번호를 입력하세요.";
      hasError = true;
    }
    if(!userInfo.name){
      errors.name = "이름을 입력하세요.";
      hasError = true;
    }
    // 이미 로컬 스토리지에 등록된 회원일 경우
    const Users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    if(Users.some(user => user.id === userInfo.id)){
      alert("이미 등록된 회원입니다.");
      return;
    };
    setError(errors);
    if (hasError) return;

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
    <Container className="regi-con">
      <div className="regi-title">회원가입</div>
      <Form className="regi-form">
        <Form.Control type="text" name="id" value={userInfo.id} onChange={handleUserInfo} placeholder="아이디"/>
        {error.id && <div className="regi-error">{error.id}</div>}
        <Form.Control type="password" name="pwd" value={userInfo.pwd} onChange={handleUserInfo} placeholder="비밀번호"/>
        {error.pwd && <div className="regi-error">{error.pwd}</div>}
        <Form.Control type="text" name="name" value={userInfo.name} onChange={handleUserInfo} placeholder="이름"/>
        {error.name && <div className="regi-error">{error.name}</div>}

        <div className="regi-button">
          <Button variant="secondary" onClick={del}>취소하기</Button>
          <Button variant="primary" onClick={fin}>회원가입</Button>
        </div>
      </Form>
    </Container>
  )
}

export default Register;