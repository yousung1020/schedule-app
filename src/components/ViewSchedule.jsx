import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";


function ViewSchedule() {
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const scheId = queryParams.get('id');
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    name: ""
  });
  
  const [Schedule,setSchedule] = useState({
    id: "",
    date: "",
    title: "",
    desc: "",
    time: ""
  });
  useEffect(()=>{
    const username = JSON.parse(localStorage.getItem('LoginUser'));
    setUserInfo(username);
    const userKey = `${username.id}_${username.pwd}`;
    const scheduleData = JSON.parse(localStorage.getItem(userKey));
    const target = scheduleData.find(item => item.id === scheId);
    setSchedule(target);
  },[]);

  const gobackbtn = () => {
    const {id , pwd} = userInfo;
    const queryParams = new URLSearchParams({id,pwd});
    nav(`/calendar?${queryParams.toString()}`);
  }

  const Updatebtn = () => {
    nav(`/update-schedule?id=${scheId}`);
  }

  const Deletebtn = () => {
    if(!window.confirm("정말로 삭제하시겠습니까?")) return;
    const userKey = `${userInfo.id}_${userInfo.pwd}`;
    const scheduleData = JSON.parse(localStorage.getItem(userKey));
    
    const DelSche = scheduleData.filter(item => item.id !== scheId);
    localStorage.setItem(userKey,JSON.stringify(DelSche));
    nav(`/calendar`);
  }

  return(
    <div>
      <Button onClick={gobackbtn}>뒤로가기</Button>
      <form>
        <div>선택한 날짜</div>
        <div>{Schedule.date}</div>
        <div>일정</div>
        <div>{Schedule.title}</div>
        <div>내용</div>
        <div>{Schedule.desc}</div>
        <div>시간</div>
        <div>{Schedule.time}</div>
      </form>
      <Button onClick={Updatebtn}>수정하기</Button>
      <Button onClick={Deletebtn}>삭제하기</Button>
    </div>
  )
}

export default ViewSchedule;
