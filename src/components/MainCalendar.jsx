import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

function MainCalendar() {
  // useLocation 함수는 현재 url 정보를 담은 객체를 반환
  // search에 쿼리 파라미터 값이 있으며, URLSearchParams 객체를 통해 쿼리 파라미터를 객체를 다루듯이 데이터를 편하게 사용 가능!!
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nav = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: ""
  });
  
  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState(null);
  // 선택된 날짜의 일정 상태
  const [selectedSchedule, setSelectedSchedule] = useState([]);

  const handleDate = (date) => {
    setSelectedDate(date);
  }

  useEffect(() => {
    setUserInfo({id: queryParams.get('id'), pwd: queryParams.get('pwd')});

  }, []);

  useEffect(() => {

  }, [selectedDate]);

  return(
    <div>
      <header>
        <button onClick={() => {nav("/")}}>로그아웃</button>
      </header>
      <Calendar onChange={handleDate}/>
      {dateClick && (
        <div>
          test
        </div>
      )}

    </div>
  )
}

export default MainCalendar;