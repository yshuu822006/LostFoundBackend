import './App.css';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import LoginPage from './Components/LoginComponent/LoginPage';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import StudentMenu from './Components/LoginComponent/StudentMenu';
import LostItemRegistration from './Components/ItemComponents/LostItemRegistration';
import LostItemReport from './Components/ItemComponents/LostItemReport';
import Dummy from './Components/ItemComponents/Dummy';
import FoundItemRegistration from './Components/ItemComponents/FoundItemRegistration';
import FoundItemReport from './Components/ItemComponents/FoundItemReport';
import MatchItemSearch from './Components/ItemComponents/MatchItemSearch';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
           <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterUser/>}/>
              <Route path='/admin-menu' element={<AdminMenu/>}/>
              <Route path='/student-menu' element={<StudentMenu/>}/>
              <Route path='/dummy/:no' element={<Dummy/>}/>
              <Route path="/lost-item-form" element={<LostItemRegistration/>} />
              <Route path="/lost-item-list" element={<LostItemReport/>} />
              <Route path="/found-item-form" element={<FoundItemRegistration/>} />
              <Route path="/found-item-list" element={<FoundItemReport/>} />
              <Route path='/search/:pid' element={<MatchItemSearch/>}/>
           </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
