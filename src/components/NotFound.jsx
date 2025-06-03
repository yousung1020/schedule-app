import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
function NotFound() {
    const nav = useNavigate();
    const First = () =>{
        nav('/');
    }
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404</h1>
      <p>잘못된 페이지입니다.</p>
      <Button onClick={First}>처음으로 되돌아가기</Button>
    </div>
  );
}

export default NotFound;