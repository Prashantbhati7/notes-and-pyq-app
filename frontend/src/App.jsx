import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/Home'
import Upload from './pages/Upload'
import Browse from './pages/Browse'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Semnotes from './pages/Semnotes';
import { useState } from 'react';
function App() {
  const [authuser,setauthuser] = useState(null);
  return (
    <div className='h-full w-full'>
     <BrowserRouter>
      <Navbar authuser={authuser} setauthuser={setauthuser}/>
      <Routes>
        <Route path="/"element={<Home ></Home>}></Route>
        <Route path="/upload" element={<Upload />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login  setauthuser={setauthuser} />} />
        <Route path="/signup" element={<Signup setauthuser={setauthuser}/>} />
        <Route path='/browse/:sem' element={<Semnotes/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App
