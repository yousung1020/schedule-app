import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

function MainCalendar() {
  // useLocation 함수는 현재 url 정보를 담은 객체를 반환
  // search에 쿼리 파라미터 값이 있으며, URLSearchParams 객체를 통해 쿼리 파라미터를 객체를 다루듯이 데이터를 편하게 사용 가능!!
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: ""
  });
  
  // 일정 정보를 나타내는 상태
  const [schedule, setSchedule] = useState([]);

  // 캘린더의 날짜를 클릭했는지 상태
  const [dateClick, setDateClick] = useState(false);

  const handleDate = (date) => {
    console.log(date.getDate());
  }

  useEffect(() => {
    setUserInfo({id: queryParams.get('id'), pwd: queryParams.get('pwd')});

  }, []);

  return(
    <>
      <Calendar onChange={handleDate}/>

    </>
  )
}

export default MainCalendar;