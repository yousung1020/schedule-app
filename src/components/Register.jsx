import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import '../css/Register.css'
import usePageTitle from "../hooks/usePageTitle";
import { EyeFill , EyeSlashFill } from "react-bootstrap-icons";

function Register() {
  usePageTitle("회원가입 페이지");
  const [error, setError] = useState({
    id: "",
    pwd: "",
    name: "",
    confirmpwd: "",
  })
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd : "",
    name : "",
    confirmpwd : "",
  });

  const localStorageKey = "userInfo";

  const nav = useNavigate();
  
  const [showpwd , setShowPwd] = useState(false);
  const [showConfirmpwd , setShowConfirmpwd] = useState(false);

  const togglePwd = () => setShowPwd(!showpwd);
  const toggleConfirmpwd = () => setShowConfirmpwd(!showConfirmpwd);

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
    if(!userInfo.confirmpwd){
      errors.confirmpwd = "비밀번호 확인을 입력하세요.";
      hasError = true;
    }
    if(userInfo.pwd && userInfo.confirmpwd && userInfo.pwd !== userInfo.confirmpwd){
      errors.confirmpwd = "비밀번호가 일치하지 않습니다.";
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
    const newUser = {
      id: userInfo.id,
      pwd: userInfo.pwd,
      name: userInfo.name
    }
    const updateUsers = [...Users, newUser];
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
        <Form.Control type="text" name="id" value={userInfo.id} onChange={handleUserInfo} placeholder="아이디" className="mb-3"/>
        {error.id && <div className="regi-error">{error.id}</div>}
        
        <InputGroup>
          <Form.Control type={showpwd ? "text" : "password"} name="pwd" value={userInfo.pwd} onChange={handleUserInfo} placeholder="비밀번호"/>
          <Button variant="primary" onClick={togglePwd}>{showpwd ? <EyeSlashFill/> : <EyeFill/>} </Button>
        </InputGroup>
        {error.pwd && <div className="regi-error">{error.pwd}</div>}
        <InputGroup>
          <Form.Control type={showConfirmpwd ? "text" : "password"} name="confirmpwd" value={userInfo.confirmpwd} onChange={handleUserInfo} placeholder="비밀번호 확인"/>
          <Button variant="primary" onClick={toggleConfirmpwd}>{showConfirmpwd ? <EyeSlashFill/> : <EyeFill/>} </Button>
        </InputGroup>
        {error.confirmpwd && <div className="regi-error">{error.confirmpwd}</div>}

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