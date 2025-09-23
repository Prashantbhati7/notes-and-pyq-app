
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css'
export default function Navbar() {
  const Navigate = useNavigate();
  const [user, setuser] = useState(null);
  const getuser = async () => {
    let url = `${import.meta.env.VITE_APP_API_URL}/auth/login/success`;
    let { data } = await axios(url, { withCredentials: true });
    // let data = res.json();
    // console.log(`${import.meta.env.VITE_APP_API_URL}`)
    console.log(data.user._json);
    setuser(data.user._json);
  }
  useEffect(() => {
    getuser();
  }, []);
  const logout = () => {
    window.open(
      `http://localhost:3000/auth/logout`,
      "_self"
    )
  };
  const renderlogin = () => {
    Navigate('/login');
  }
  const rendersignup = () => {
    Navigate('/signup');
  }
  const home = () => {
    Navigate('/');
  }
  return (<>
    <div className="navbar sticky  top-0 z-50 backdrop-blur-md bg-indigo-600/80 text-blue-50 shadow-md pl-3 h-auto md:h-[8%] flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Home Button */}
      <div className="home flex w-[10%] flex-col md:flex-row items-center text-xl">
        <button className='h-full text-left cursor-pointer' onClick={home}>Home</button>
      </div>

      {/* Right Buttons (Login / Signup / Logout) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 pr-4">

        {!user && (
          <>
            <div>
              <button className="login sm:w-[20%] md:w-full  text-left animate-bounce text-xl" onClick={renderlogin}>Login</button>
            </div>
            <div>
              <button className="signup sm:w-[20%] md:w-full  text-left text-xl" onClick={rendersignup}>Signup</button>
            </div>
          </>
        )}

        {user && (
          <button className="text-xl" onClick={logout}>Logout</button>
        )}

      </div>
    </div>

  </>)
};