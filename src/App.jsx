import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputPage from './components/InputPage';
import MainCalendar from './components/MainCalendar';

function App(){
    return (
      <Router> {/** react router 기능 활성화 */}
        <Routes> {/** url 경로에 따른 컴포넌트 매칭 */}
          <Route path='/' element={<InputPage />} />
          <Route path='/calendar' element={<MainCalendar />} />
        </Routes>
      </Router>
    )
}

export default App;