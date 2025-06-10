import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../css/MainCalendar.css";
import moment from "moment";
import "moment/locale/ko"

moment.locale("ko");
function MainCalendar() {
  
  // useLocation 함수는 현재 url 정보를 담은 객체를 반환
  // search에 쿼리 파라미터 값이 있으며, URLSearchParams 객체를 통해 쿼리 파라미터를 객체를 다루듯이 데이터를 편하게 사용 가능!!
  const nav = useNavigate();

  // 유저의 정보 및 해당 로그인한 유저의 일정 정보 가져오기
  const userInfo = JSON.parse(localStorage.getItem("LoginUser"));
  // 로그인한 유저의 일정이 있으면 해당 일정을 초기값으로, 없으면 빈배열로 초기화
  const [userSchedule, setUserSchedule] = useState(() => {
    const scheduleData = localStorage.getItem(`${userInfo.id}_${userInfo.pwd}`) || "[]";
    return JSON.parse(scheduleData);
  } 
  );

  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState(null);
  // 선택된 날짜의 일정 상태
  const [selectedSchedule, setSelectedSchedule] = useState([]);

  // 캘린더에서 날짜를 클릭했을 때
  const handleDate = (date) => {
    // 선택된 날짜에 해당하는 일정을 가져오기 위해 기존 Date 객체 포맷팅 ex)2025-06-10
    const formatDate = moment(date).format("YYYY-MM-DD");

    setSelectedDate(formatDate);
    console.log(selectedDate);
  }

  // 날짜를 일, 요일로 포맷팅
  const formatDay = (selectedDate) => {
    const dayOfWeek = moment(selectedDate).format("ddd");
    return `${moment(selectedDate).format("DD")}일 ${dayOfWeek}`
  }

  const togScheduleComplete = (scheId) => {
    const updateSchedule = userSchedule.map((sche) => (
      sche.id === scheId ? {
        ...sche, completed: !sche.completed
      } : sche
    ))

    setUserSchedule(updateSchedule);
  }

  const deleteSchedule = (scheId) => {
    if(scheId === undefined){
      const removeCheck = userSchedule.some((sche) => sche.completed === true);
      if(!removeCheck){
        alert("완료된 일정이 없습니다.");
        return;
      }

      if(!window.confirm("정말 완료된 일정을 모두 제거하시겠습니까?")) return;
      // completed 프로퍼티 값이 false만 반환
      const removeCompleteSchedule = userSchedule.filter((sche) => sche.completed === false);
      setUserSchedule(removeCompleteSchedule);
    } else{
      if(!window.confirm("정말 해당 일정을 제거하시겠습니까?")) return;
      const updateSchedule = userSchedule.filter((sche) => (
        scheId !== sche.id
      ))

      setUserSchedule(updateSchedule);
    }
  }

  useEffect(() => {
    // userSchedule 변경시
    localStorage.setItem(`${userInfo.id}_${userInfo.pwd}`, JSON.stringify(userSchedule));

    // 선택된 날짜가 있으면
    if(selectedDate){
      const filterSchedule = userSchedule.filter((sche) => (
        sche.date === selectedDate
      ))

      setSelectedSchedule(filterSchedule);
    } else{
      setSelectedSchedule([]);
    }

  }, [userSchedule, selectedDate]);

  return(
    <div>
      <header style={{"display": "flex"}}>
        <button onClick={() => {
          localStorage.removeItem("LoginUser");
          nav("/");
          }}>로그아웃</button>
        <div>{userInfo.name}님 환영합니다!</div>
      </header>
      <div className="inner-calendar">
        <Calendar onChange={handleDate} locale="ko-KR"
        tileContent={({date, view}) => {
          if(view === "month"){
            const formatdate = moment(date).format("YYYY-MM-DD");
            const findSchedule = userSchedule.find((sche) => formatdate === sche.date);
            
            if(findSchedule){
              return (
                <div>• {findSchedule.title}</div>
              )
            }
          }
        }}/>
        <div>
          {selectedDate && (
          <div>
            {formatDay(selectedDate)}
            <div>
              <button onClick={() => nav(`/add-schedule?date=${selectedDate}`)}>일정 추가</button>
              <button onClick={() => deleteSchedule()}>완료된 일정 일괄 삭제</button>
            </div>
          </div>
          )}
        </div>

        {selectedSchedule.length > 0 ? (
          selectedSchedule.map((sche) => (
            <div key={sche.id}>
              <input type="checkbox" checked={sche.completed} onChange={() => togScheduleComplete(sche.id)}/>
              <span onClick={() => nav(`/view-schedule?id=${sche.id}`)}>{sche.title} {sche.time}</span>
              <button onClick={() => deleteSchedule(sche.id)}>X</button>
            </div>
          ))
        ) : (<p>해당 날짜에는 일정이 없습니다!</p>)}
        
      </div>
    </div>
  )
}

export default MainCalendar;