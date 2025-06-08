import { useEffect, useState } from 'react';
import Schedule from './Schedule'
import { Button } from 'react-bootstrap';
import { v4} from 'uuid';
import { useNavigate } from 'react-router';
function AddSchedule() {
  const nav = useNavigate();
  const queryParams = new URLSearchParams(location.search);
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
    time:""
  });
   useEffect(() => {
      setUserInfo({id: queryParams.get('id'), pwd: queryParams.get('pwd'), name: queryParams.get('name')});
  
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
    const storageKey = `${userInfo.name}_${userInfo.id}_${userInfo.pwd}`;
    const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    const setid = ({
      ...addSche,
      id: v4()
    })
    const add = [...existing, setid]
    localStorage.setItem(storageKey,JSON.stringify(add));
    const queryParam = new URLSearchParams(userInfo);
    nav(`/calendar?${queryParam.toString()}`);
  }
  const cancelbtn = () => {
    const queryParam = new URLSearchParams(userInfo);
    nav(`/calendar?${queryParam.toString()}`);
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