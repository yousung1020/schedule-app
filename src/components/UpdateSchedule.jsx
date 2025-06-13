import { useState,useEffect } from "react";
import Schedule from "./Schedule";
import { useLocation, useNavigate } from "react-router";
import { Button, Container } from "react-bootstrap";
import usePageTitle from "../hooks/usePageTitle";
import '../css/UpdateSchedule.css';

function UpdateSchedule() {
  const username = JSON.parse(localStorage.getItem('LoginUser'));
  usePageTitle(`${username.name}의 일정 수정`);
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const scheId = queryParams.get('id');
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    name: "",
  });
  const [updateSche,setUpdateSche] = useState({
    id:"",
    date:"",
    title:"",
    desc:"",
    time:""
  });
  useEffect(()=>{
    setUserInfo(username);
    const userKey = `${username.id}_${username.pwd}`;
    const scheduleData = JSON.parse(localStorage.getItem(userKey));
    const target = scheduleData.find(item => item.id === scheId);
    setUpdateSche(target);
  },[]);
  const handleUserInfo = (e) => {
    setUpdateSche({
        ...updateSche,
        [e.target.name]: e.target.value
    });
 
  }
  const Cancelbtn = () => {
    nav(`/view-schedule?id=${scheId}`);
  }
  const Updatebtn = () => {
    if(!updateSche.title){
      alert("일정을 입력하세요.");
      return;
    }
    if(!updateSche.desc){
      alert("내용을 입력하세요.");
      return;
    }
    if(!updateSche.time){
      alert("시간을 정하세요.");
      return;
    }
    if(!window.confirm("일정을 수정하시겠습니까?")) return;
    
    const userKey = `${userInfo.id}_${userInfo.pwd}`;
    const scheduleData = JSON.parse(localStorage.getItem(userKey));
    const Updated = scheduleData.map(item =>
        item.id === scheId ? updateSche : item);
    localStorage.setItem(userKey,JSON.stringify(Updated));
    nav(`/calendar`,{ state:{selectedDate: updateSche.date}});
  }
  return (
    <Container className="update-container">
        <h2 className="page-title">일정 수정</h2>
        <Schedule
          date={updateSche.date}
          title={updateSche.title}
          desc={updateSche.desc}
          time={updateSche.time}
          onChange={handleUserInfo}
        />
      <div className="button-group">
        <Button variant='secondary' onClick={Cancelbtn}>취소하기</Button>
        <Button onClick={Updatebtn}>수정하기</Button>
      </div>
    </Container>
  )
}

export default UpdateSchedule;
