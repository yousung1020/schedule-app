import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/button';

export default function MainCalendar(){
  const [date, setDate] = useState(new Date());

  const dateClick = (newDate) => {
    setDate(newDate);
  }

  return (
    <div>
      <Calendar onChange={dateClick}/>
    </div>
  )
}