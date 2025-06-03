import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainCalendar from './components/MainCalendar';
import AddSchedule from './components/AddSchedule';
import UpdateSchedule from './components/UpdateSchedule';
import NotFound from './components/NotFound';
import ViewSchedule from './components/ViewSchedule';
import EditSchedule from './components/EditSchedule';


function App(){
    return (
      <Router> {/** react router 기능 활성화 */}
        <Routes> {/** url 경로에 따른 컴포넌트 매칭 */}
          <Route path='/' element={<Login />} />
          <Route path='/calendar' element={<MainCalendar />} />
          <Route path='/add-schedule' element={<AddSchedule/>}/>
          <Route path='/update-schedule' element={<UpdateSchedule/>}/>
          <Route path='/view-schedule/:id' element={<ViewSchedule/>}/>
          <Route path='/edit-schedule/:id' element={<EditSchedule/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    )
}

export default App;