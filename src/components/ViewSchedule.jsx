import "../css/ViewSchedule.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewSchedule() {
  const { id } = useParams();
  const nav = useNavigate();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    const phone = localStorage.getItem("userPhone") || "";
    const key = `user_${name}_${phone}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    const found = saved.find((item) => String(item.id) === id);
    setSchedule(found);
  }, [id]);

  if (!schedule) return <p className="text-center mt-5">일정을 찾을 수 없습니다.</p>;

  return (
    <div className="view-schedule-container">
      <div className="view-schedule-header">{localStorage.getItem("userName")}님 일정 상세 보기</div>

      <div className="schedule-detail-label">날짜</div>
      <div className="schedule-detail-value">{schedule.date}</div>

      <div className="schedule-detail-label">일정 제목</div>
      <div className="schedule-detail-value">{schedule.title}</div>

      <div className="schedule-detail-label">내용</div>
      <div className="schedule-detail-value">{schedule.details || "내용 없음"}</div>

      <div className="schedule-detail-label">시간</div>
      <div className="schedule-detail-value">{schedule.time || "시간 미지정"}</div>

      <div className="schedule-detail-label">완료 여부</div>
      <div className="schedule-detail-value">{schedule.completed ? "✅ 완료됨" : "❌ 미완료"}</div>

      <div className="button-group">
        <button className="btn btn-secondary" onClick={() => nav("/calendar")}>뒤로가기</button>
        <button className="btn btn-primary" onClick={() => nav(`/edit-schedule/${id}`)}>수정하기</button>
      </div>
    </div>
  );
}

export default ViewSchedule;
