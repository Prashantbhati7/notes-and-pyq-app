
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from './context/firebase';
import '../index.css'
export default function Navbar({}) {
  const Navigate = useNavigate();
  const firebase = useFirebase();
  const logout = async() => {
    //  const response  = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/user/logout`,{
    //   method:"GET",
    //   credentials:"include",
    //  });
    //  const data = await response.json();
    //  console.log("logout response is ",data);
    firebase.logout();
    Navigate('/');
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

        {!firebase.isloggedin && (
          <>
            <div>
              <button className="login cursor-pointer sm:w-[20%] md:w-full  text-left animate-bounce text-xl" onClick={renderlogin}>Login</button>
            </div>
            <div>
              <button className="signup cursor-pointer sm:w-[20%] md:w-full  text-left text-xl" onClick={rendersignup}  >Signup</button>
            </div>
          </>
        )}

        {firebase.isloggedin && (
          <button className="text-xl cursor-pointer"  onClick={logout}>Logout</button>
        )}

      </div>
    </div>

  </>)
};