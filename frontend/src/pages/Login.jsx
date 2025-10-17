import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login(){
    const [user,setuser] = useState({username:"",scholar:"",email:"",password:""});
    const handlechange = (e)=>{
        setuser((prevuser)=>({
            ...prevuser,
            [e.target.name]:e.target.value,
        }));
    }
    const handlesubmit= (e)=>{
        e.preventDefault();
        console.log("logged in ");
    }
    const GoogleAuth=()=>{
        window.open(`${import.meta.env.VITE_APP_API_URL}/auth/google`,
     'self',)
    }
    return(<>
    <div className="flex h-[92%] flex-row items-center justify-center">
    <form className="w-[40%] mt-10 "> 
       <label htmlFor="email" >Email</label>
       <input type="text" id="email" name="email" className="border mb-6 py-1 w-full rounded-md outline-red" />

       <label htmlFor="username">password</label>
       <input type="text" id="password" name="password" className="border py-1 mb-6 w-full rounded-md outline-red" />
       <button className="border ms-[42%] px-[5%] rounded-md hover:bg-blue-400" type="submit" onClick={handlesubmit}>Login</button>
       <hr  className="mt-4 "/>
       {/* <p className="text-center">or</p>
       <div className="flex flex-row justify-center">
        <button className="bg-blue-600 mt-4 w-full py-5 border rounded-xl text-center text-red-50" onClick={GoogleAuth}>Continue with google</button>
       </div>
       <div className="flex flex-row mt-3 justify-center">
        <p>new here? <Link to='/signup' className="text-blue-700">SignUp</Link></p> */}
        {/* </div> */}
    </form> 
    </div>
    </>)
};
