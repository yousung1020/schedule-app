import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

function AddSchedule() {
  const navigate = useNavigate();
  const location = useLocation();

  // 쿼리스트링에서 날짜 받아오기 (ex: ?date=2025-06-02)
  const params = new URLSearchParams(location.search);
  const selectedDate = params.get("date") || "";

  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleDetails, setScheduleDetails] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    setUserName(name);
  }, []);

  // 취소 버튼 클릭 시 캘린더로 이동
  const handleCancel = () => {
    navigate("/calendar");
  };

  // 추가 버튼 클릭 시
  const handleAdd = () => {
    if (!scheduleTitle) {
      alert("일정을 입력하세요.");
      return;
    }
    if (!scheduleTime) {
      alert("시간을 선택하세요.");
      return;
    }

    // 로컬스토리지에 저장 (userKey 기준)
    const userPhone = localStorage.getItem("userPhone") || "";
    const userKey = `user_${userName}_${userPhone}`;

    // 기존 일정 불러오기
    const schedulesStr = localStorage.getItem(userKey);
    let schedules = schedulesStr ? JSON.parse(schedulesStr) : [];

    // 새 일정 객체
    const newSchedule = {
      id: Date.now(), // 고유 id
      date: selectedDate,
      title: scheduleTitle,
      details: scheduleDetails,
      time: scheduleTime,
      completed: false,
    };

    // 일정 추가 후 다시 저장
    schedules.push(newSchedule);
    localStorage.setItem(userKey, JSON.stringify(schedules));

    // 캘린더 페이지로 이동
    navigate("/calendar");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "20px" }}>{userName ? `${userName}님 환영합니다.` : "환영합니다."}</h2>
      <div style={{ marginBottom: "15px" }}>
        <strong>선택한 날짜:</strong> {selectedDate || "선택된 날짜가 없습니다."}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>일정을 적으세요:</label>
        <input
          type="text"
          value={scheduleTitle}
          onChange={(e) => setScheduleTitle(e.target.value)}
          placeholder="일정 입력"
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>간단한 내용:</label>
        <textarea
          value={scheduleDetails}
          onChange={(e) => setScheduleDetails(e.target.value)}
          placeholder="내용 입력"
          rows={4}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "25px" }}>
        <label>시간을 정하세요:</label>
        <input
          type="time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="secondary" onClick={handleCancel}>
          취소하기
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          추가하기
        </Button>
      </div>
    </div>
  );
}

export default AddSchedule;