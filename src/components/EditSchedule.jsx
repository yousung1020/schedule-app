import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EditSchedule.css";

function EditSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    details: "",
    completed: false,
  });

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    const phone = localStorage.getItem("userPhone") || "";
    if (!name || !phone) {
      alert("사용자 정보가 없습니다.");
      navigate("/");
      return;
    }
    const key = `user_${name}_${phone}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    const found = saved.find((item) => String(item.id) === String(id));
    if (!found) {
      alert("수정할 일정을 찾을 수 없습니다.");
      navigate(-1);
      return;
    }
    setSchedule(found);
    setForm({
      title: found.title,
      date: found.date,
      time: found.time || "",
      details: found.details || "",
      completed: found.completed || false,
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date) {
      alert("제목과 날짜는 필수입니다.");
      return;
    }

    const name = localStorage.getItem("userName") || "";
    const phone = localStorage.getItem("userPhone") || "";
    const key = `user_${name}_${phone}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");

    const updated = saved.map((item) =>
      String(item.id) === String(id) ? { ...item, ...form } : item
    );

    localStorage.setItem(key, JSON.stringify(updated));
    alert("일정이 수정되었습니다.");
    navigate(`/view-schedule/${id}`);
  };

  if (!schedule) return <p className="loading-text">로딩 중...</p>;

  return (
    <div className="edit-schedule-container">
      <h2 className="edit-schedule-title">일정 수정</h2>
      <form onSubmit={handleSubmit} className="edit-schedule-form">
        <label className="form-label" htmlFor="title">
          제목*
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label className="form-label" htmlFor="date">
          날짜*
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label className="form-label" htmlFor="time">
          시간
        </label>
        <input
          id="time"
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label" htmlFor="details">
          내용
        </label>
        <textarea
          id="details"
          name="details"
          value={form.details}
          onChange={handleChange}
          rows={4}
          className="form-textarea"
        />

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            저장
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSchedule;
