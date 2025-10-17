
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup(){
     const [user,setuser] = useState({username:"",scholar:"",email:"",password:""});
        const handlechange = (e)=>{
            setuser((prevuser)=>({
                ...prevuser,
                [e.target.name]:e.target.value,
            }));
        }
        const handlesubmit= (e)=>{
            e.preventDefault();
            console.log("signed up ");
        }
        const GoogleAuth=()=>{
            window.open(`${import.meta.env.VITE_APP_API_URL}/auth/google`,
         'self',)
        }
        return( <>
        <div className="flex flex-col items-center h-[92%] justify-center">
        <form className="w-[40%] mt-10"> 
    
           <label htmlFor="username" >username</label>
           <input type="text" id="username" name="username" className="border mb-6 w-full rounded-md outline-red" />
    
    
           <label htmlFor="scholar" >Scholar Number</label>
    
           <input type="text" id="scholar" name="scholar" className="border mb-6 w-full rounded-md outline-red" />
    
           <label htmlFor="email" >Email</label>
           <input type="text" id="email" name="email" className="border mb-6 w-full rounded-md outline-red" />
    
           <label htmlFor="username">password</label>
           <input type="text" id="password" name="password" className="border mb-6 w-full rounded-md outline-red" />
    
           <button className="border ms-[40%] px-8 py-1 rounded-md hover:bg-blue-400" type="submit" onClick={handlesubmit}>signup</button>
        </form> 
        <hr className="mt-4"/>
        {/* <p className="text-center">or</p>
        <div className="flex w-full flex-row justify-center">
            <button className="bg-blue-600 w-[40%] py-3 border rounded-xl text-center text-blue-100" onClick={GoogleAuth}>continue with google</button>
        </div>
        <div className="text-center w-full mt-3">already have account? <Link to='/login' className="text-blue-700">Log in</Link></div>
        </div> */}
        </div>
        </>
        )
};