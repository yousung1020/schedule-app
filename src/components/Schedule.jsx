function Schedule({date,title,desc,time,onchange}) {
  return(
    <div>  
      <form>
        <div>선택한 날짜</div>
        <div>{date}</div>
        <div>일정을 입력하세요.</div>
        <input type="text" name="title" value={title} onChange={onchange} placeholder={"일정 입력"}/>
        <div>내용을 입력하세요.</div>
        <input type="text" name="desc" value={desc} onChange={onchange} placeholder={"내용 입력"}/>
        <div>시간을 정하세요.</div>
        <input type="time" name="time" value={time} onChange={onchange}/>
      </form>
    </div>
  )
}

export default Schedule;
