import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MainCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userName, setUserName] = useState("");
  const [schedules, setSchedules] = useState([]);
  const nav = useNavigate();

  const year = selectedDate?.getFullYear() ?? "";
  const month = selectedDate ? String(selectedDate.getMonth() + 1).padStart(2, "0") : "";
  const day = selectedDate ? String(selectedDate.getDate()).padStart(2, "0") : "";
  const ForDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    const phone = localStorage.getItem("userPhone") || "";
    setUserName(name);
    if (name && phone) {
      const userKey = `user_${name}_${phone}`;
      const saved = localStorage.getItem(userKey);
      if (saved) setSchedules(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => nav("/");
  const onDateClick = (date) => setSelectedDate(date);
  const ClickAddBtn = () => nav(`/add-schedule?date=${ForDate}`);

  const handleCheckboxToggle = (id) => {
    const updated = schedules.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setSchedules(updated);
    const phone = localStorage.getItem("userPhone") || "";
    const userKey = `user_${userName}_${phone}`;
    localStorage.setItem(userKey, JSON.stringify(updated));
  };

  const handleDeleteSchedules = () => {
  if (!window.confirm("체크된 일정을 삭제하시겠습니까?")) return;
  const updated = schedules.filter(item => !item.completed);
  setSchedules(updated);

  const phone = localStorage.getItem("userPhone") || "";
  const userKey = `user_${userName}_${phone}`;
  localStorage.setItem(userKey, JSON.stringify(updated));
  };

  const ScheduleClick = (id) => {
    nav(`/view-schedule/${id}`);
  }

  const filteredSchedules = schedules.filter((item) => item.date === ForDate).sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });
  return (
    <>
      {/* 상단 고정 네비게이션 바: 로그아웃 버튼과 사용자 환영 메시지 */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "60px",
        backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000
      }}>
        <Button variant="outline-danger" onClick={handleLogout}
          style={{ position: "absolute", left: 20 }}>
          로그아웃
        </Button>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          {userName ? `${userName}님 환영합니다.` : ""}
        </div>
      </div>

      {/* 메인 컨테이너: 화면 중앙에 달력과 일정 영역 배치 */}
      <Container fluid style={{
        marginTop: "80px", height: "calc(100vh - 80px)", display: "flex",
        justifyContent: "center", alignItems: "center", maxWidth:"1800px",
        transition: "all 0.4s ease"
      }}>
        {/* 내부 래퍼: 달력과 일정 박스의 flex 레이아웃 및 간격 조절 */}
        <div style={{
          display: "flex", width: selectedDate ? "90%" : "80%",
          maxWidth: "1600px", transition: "all 0.4s ease",
          justifyContent:"center",
          alignItems: "flex-start", gap: "10px"
        }}>
          {/* 달력 영역: 달력 컴포넌트와 일정 요약 텍스트 표시 */}
          <div style={{
            flex: selectedDate ? "0 0 65%" : "0 0 100%",
            display: "flex", justifyContent: "flex-end"
          }}>
            <Calendar
              onChange={onDateClick}
              value={selectedDate || new Date()}
              tileContent={({ date, view }) => {
                // 날짜가 선택된 경우 달력에 일정 미노출 처리
                if (view === "month") {
                  if (selectedDate) return null;
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, "0");
                  const dd = String(date.getDate()).padStart(2, "0");
                  const dateStr = `${yyyy}-${mm}-${dd}`;
                  const daySchedules = schedules.filter((item) => item.date === dateStr).sort((a,b)=>{
                    if(!a.time) return 1;
                    if(!b.time) return -1;
                    return a.time.localeCompare(b.time);
                  }).slice(0, 2);
                  return (
                    <div style={{
                      marginTop: 2, fontSize: "0.65em", color: "#444",
                      lineHeight: 1.1
                    }}>
                      {daySchedules.map((item) => (
                        <div key={item.id} title={item.title} style={{
                          whiteSpace: "nowrap", overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>
                          • {item.title}
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
          </div>

          {/* 일정 목록 영역: 선택한 날짜의 일정 표시 및 추가/삭제 버튼 */}
          <div style={{
            flex: "0 0 40%", backgroundColor: "#f9f9f9", padding: "30px",
            borderRadius: "8px", boxShadow: "0 0 15px rgba(0,0,0,0.15)",
            maxHeight: "80vh", overflowY: "auto", fontSize: "1.15rem", marginLeft:"30px"
          }}>
            {/* 선택된 날짜 표시 */}
            {selectedDate && (
              <p><strong>{selectedDate.toLocaleDateString()}</strong></p>
            )}

            {/* 선택된 날짜에 일정이 없을 때 메시지 */}
            {filteredSchedules.length === 0 && selectedDate && (
              <p>일정이 없습니다.</p>
            )}

            {/* 선택된 날짜 일정 리스트 */}
            {selectedDate && filteredSchedules.map((item) => (
              <div key={item.id} onClick={()=> ScheduleClick(item.id)}
                style={{display: "flex", alignItems: "center", marginBottom: "10px",
                backgroundColor: item.completed ? "#d4edda" : "transparent",
                padding: "5px 10px", borderRadius: "5px"
              }}>
                <input type="checkbox" checked={item.completed} onChange={() => handleCheckboxToggle(item.id)} style={{ marginRight: "10px" }}
                onClick={e => e.stopPropagation()}/>
                <div style={{ flexGrow: 1 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px"
                  }}>
                    <span style={{ fontWeight: "bold" }}>{item.title}</span>
                    <span style={{ fontSize: "0.95em", color: "#555" }}>
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* 일정 추가 및 삭제 버튼 */}
            {selectedDate && (
              <div style={{ marginTop: "20px" }}>
                <Button variant="primary" style={{ marginRight: "10px" }}
                  onClick={ClickAddBtn}>추가</Button>
                <Button variant="danger" onClick={handleDeleteSchedules}>삭제</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default MainCalendar;
