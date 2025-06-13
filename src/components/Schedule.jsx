import { Form } from 'react-bootstrap';

function Schedule({ date, title, desc, time, onChange }) {
  return (
    <Form>
      <Form.Group className="mb-3 px-3">
        <Form.Label>날짜</Form.Label>
        <Form.Control className='w-auto' type="text" name="date" value={date} readOnly/>
      </Form.Group>

      <Form.Group className="mb-3 px-3">
        <Form.Label>일정 제목</Form.Label>
        <Form.Control className='w-auto' type="text" name="title" placeholder="일정 제목을 입력하세요" value={title} onChange={onChange}/>
      </Form.Group>

      <Form.Group className="mb-3 px-3" controlId="formDesc">
        <Form.Label>일정 설명</Form.Label>
        <Form.Control as="textarea" rows={3} name="desc" placeholder="일정 내용을 입력하세요" value={desc} onChange={onChange}/>
      </Form.Group>

      <Form.Group className="mb-3 px-3" controlId="formTime">
        <Form.Label>시간</Form.Label>
        <Form.Control className='w-auto' type="time" name="time" value={time} onChange={onChange}/>
      </Form.Group>
    </Form>
  );
}

export default Schedule;
