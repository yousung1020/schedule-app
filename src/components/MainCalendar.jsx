import { useState, useEffect } from "react";
import { useNavigate , useLocation} from "react-router";
import { Button, Container, Navbar, Nav, Col, Row, Card } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../css/MainCalendar.css";
import moment from "moment";
import 'moment/dist/locale/ko'
import usePageTitle from "../hooks/usePageTitle";

moment.locale("ko");
function MainCalendar() {
  // useLocation 함수는 state 값을 읽음
  const nav = useNavigate();
  const location = useLocation();
  // 유저의 정보 및 해당 로그인한 유저의 일정 정보 가져오기
  const userInfo = JSON.parse(localStorage.getItem("LoginUser"));
  usePageTitle(`${userInfo.name}님의 캘린더`);
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

  useEffect(() => {
    if(location.state?.selectedDate){
      setSelectedDate(location.state.selectedDate);
      nav(location.pathname, { replace: true, state: {} })
    }

  }, [location.state]);

  return (
    <>
      <header className="custom-header bg-dark text-white py-3 d-flex justify-content-between align-items-center px-4">
        <h3 className="mb-0">{userInfo.name}님의 캘린더</h3>
        <Button
          variant="outline-light"
          onClick={() => {
            localStorage.removeItem("LoginUser");
            nav("/");
          }}
        >
          로그아웃
        </Button>
      </header>

      <Container className="main-calendar-container py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={6} xl={6} className="calendar-section">
            <Card className="calendar-card">
              <Calendar
                onChange={handleDate}
                locale="ko"
                value={selectedDate ? moment(selectedDate).toDate() : null}
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const formatdate = moment(date).format("YYYY-MM-DD");
                    const findSchedule = userSchedule.find((sche) => formatdate === sche.date);
                    if (findSchedule) {
                      return (
                        <div className="has-schedule-dot"></div>
                      );
                    }
                  }
                  return null;
                }}
                
                tileClassName={({ date, view }) => {
                  if (view === 'month') {
                    const day = date.getDay(); // 0 = 일요일, 6 = 토요일
                    const classes = [];
                   
                    // 현재 달이 아닌 날짜에 대한 클래스 추가
                    // moment(date).month()는 0부터 시작, moment(new Date()).month()도 0부터 시작
                    // 현재 캘린더에 표시되는 달 (예: 2025년 6월)과 실제 날짜의 달이 다르면 other-month 클래스 추가
                    if (date.getMonth() !== new Date(moment(selectedDate || new Date()).startOf('month')).getMonth()) {
                      classes.push('other-month-day');
                    }

                    // 토요일에 파란색 클래스 추가
                    if (day === 6) { // 토요일
                      classes.push('saturday-day');
                    }
                    // 일요일에 빨간색 클래스 추가
                    else if (day === 0) { // 일요일
                      classes.push('sunday-day');
                    }

                    return classes.length > 0 ? classes : null;
                  }
                  return null;
                }}
              />
            </Card>
          </Col>

          {/* 일정 정보 섹션 */}
          <Col className="schedule-info-section mt-4 mt-md-0">
            <Card className="schedule-info-card">
              <Card.Body className="p-3 p-md-4">
                {selectedDate ? (
                  <>
                    <h4 className="schedule-info-title">{moment(selectedDate).format("D일 일정 dddd")}</h4>
                    
                    <div className="schedule-actions mb-3 d-flex flex-wrap justify-content-start">
                      <Button variant="primary" onClick={() => nav(`/add-schedule?date=${selectedDate}`)} className="mb-2 mb-sm-0 me-sm-2">일정 추가</Button>
                      <Button variant="danger" onClick={() => deleteSchedule()}>완료된 일정 일괄 삭제</Button>
                    </div>

                    {selectedSchedule.length > 0 ? (
                      <div className="schedule-items-list">
                        {selectedSchedule.map((sche) => (
                          <div key={sche.id} className="schedule-item-wrapper d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center flex-grow-1">
                              <input
                                type="checkbox"
                                checked={sche.completed}
                                onChange={() => togScheduleComplete(sche.id)}
                                className="form-check-input me-2"
                              />
                              <span
                                onClick={() => nav(`/view-schedule?id=${sche.id}`)}
                                className={`schedule-item-title ${sche.completed ? "text-decoration-line-through text-muted" : ""}`}
                                style={{ cursor: 'pointer' }}
                              >
                                {sche.title} {moment(sche.time, "HH:mm").format("A hh:mm")}
                              </span>
                            </div>
                            <Button variant="outline-danger" size="sm" onClick={() => deleteSchedule(sche.id)}>X</Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted mt-3 text-center">해당 날짜에는 일정이 없습니다!</p>
                    )}
                  </>
                ) : (
                  <div className="no-date-selected text-center py-5">
                    <p className="text-muted">날짜를 선택하여 일정을 확인하거나 추가하세요.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainCalendar;