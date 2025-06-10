import { useEffect, useState } from 'react';
import Schedule from './Schedule'
import { Button } from 'react-bootstrap';
import { v4} from 'uuid';
import { useLocation, useNavigate } from 'react-router';
function AddSchedule() {
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const schedate = queryParams.get('date');
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    name: "",
  });
  const [addSche,setAddSche] = useState({
    id:"",
    date:"",
    title:"",
    desc:"",
    time:"",
    completed:false
  });
   useEffect(() => {
    const userName = JSON.parse(localStorage.getItem('LoginUser'));
    setUserInfo(userName);
    setAddSche(prev=> ({
      ...prev, date: schedate
    }));
    }, []);

  const handleUserInfo = (e) => {
    setAddSche({
        ...addSche,
        [e.target.name]: e.target.value
    });

  }
  const addbtn = () => {
    if(!addSche.title){
      alert("일정을 입력하세요.");
      return;
    }
    if(!addSche.desc){
      alert("내용을 입력하세요.");
      return;
    }
    if(!addSche.time){
      alert("시간을 정하세요.");
      return;
    }
    const storageKey = `${userInfo.id}_${userInfo.pwd}`;
    const existing = JSON.parse(localStorage.getItem(storageKey));
    
    const setid = ({
      ...addSche,
      id: v4()
    })
    const add = [...existing, setid]
    localStorage.setItem(storageKey,JSON.stringify(add));
    nav(`/calendar`);
  }
  const cancelbtn = () => {
    nav(`/calendar`);
  }
  return(
    <div>
      <div>
        <Schedule
          date={addSche.date}
          title={addSche.title}
          desc={addSche.desc}
          time={addSche.time}
          onChange={handleUserInfo}
        />
      </div>
      <Button type='button' onClick={cancelbtn}>취소하기</Button>
      <Button type='button' onClick={addbtn}>추가하기</Button>
    </div>
  )
}

export default AddSchedule;
