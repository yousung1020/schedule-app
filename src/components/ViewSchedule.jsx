import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import usePageTitle from "../hooks/usePageTitle";
import '../css/ViewSchedule.css';

function ViewSchedule() {
  const username = JSON.parse(localStorage.getItem('LoginUser'));
  usePageTitle(`${username.name}님의 일정 정보`);
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
    setUserInfo(username);
    const userKey = `${username.id}_${username.pwd}`;
    const scheduleData = JSON.parse(localStorage.getItem(userKey));
    const target = scheduleData.find(item => item.id === scheId);
    setSchedule(target);
  },[]);

  const gobackbtn = () => {
    nav(`/calendar`,{ state:{selectedDate: Schedule.date} });
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
    nav(`/calendar`,{ state:{selectedDate: Schedule.date}});
  }

  return (
    <div>
      <div className="mb-3">
        <Button onClick={gobackbtn} variant="secondary" >
          ← 뒤로가기
        </Button>
      </div>
      <Container className="view-con">
        
        <Form>
          <h2 className="mx-3 mb-0 text-center">일정 정보</h2>
          <Form.Group className="mb-3">
            <Form.Label>날짜</Form.Label>
            <Form.Control type="text" readOnly value={Schedule.date} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>일정 제목</Form.Label>
            <Form.Control type="text" readOnly value={Schedule.title} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>일정 설명</Form.Label>
            <Form.Control as="textarea" rows={3} readOnly value={Schedule.desc} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>시간</Form.Label>
            <Form.Control type="text" readOnly value={Schedule.time} />
          </Form.Group>


          <div className="d-flex justify-content-end gap-2">
            <Button onClick={Updatebtn} variant="warning">
              수정하기
            </Button>
            <Button onClick={Deletebtn} variant="danger">
              삭제하기
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default ViewSchedule;
