import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../components/context/firebase";
export default function Login({setauthuser}){
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [user,setuser] = useState({username:"",email:"",password:""});
    const handlechange = (e)=>{
        setuser((prevuser)=>({
            ...prevuser,
            [e.target.name]:e.target.value,
        }));
    }
    const handlesubmit= async(e)=>{
        // e.preventDefault();
        // console.log("user is ",user);
        //  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/user/login`,{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json",
        //     },
        //     body:JSON.stringify({username:user.username,email:user.email,password:user.password}),
        // })

        // const data = await response.json();
        // console.log("data is ",data.data);
        // setauthuser(data.data.email);
        // console.log("user logged in successfully ");
        firebase.signInWithEmailAndPass(user.email,user.password);
        setuser({username:"",email:"",password:""});    
        navigate('/');
    }
    const loginwithgoogle = async(e)=>{
       console.log("login with goole button clicked " );
       firebase.googlelogin();
       navigate("/");
    }

    return(<>
    <div className="flex h-[92%] flex-row items-center justify-center">
    <form className="w-[40%] mt-10 "> 
       <label htmlFor="username" >username</label>
       <input type="text" id="email" name="username"  value={user.username} onChange={handlechange} className="border mb-6 py-1 w-full rounded-md outline-red" />
       <label htmlFor="email" >Email</label>
       <input type="text" id="email" name="email"  value={user.email} onChange={handlechange} className="border mb-6 py-1 w-full rounded-md outline-red" />

       <label htmlFor="username">password</label>
       <input type="text" id="password"  value={user.password} onChange={handlechange} required name="password" className="border py-1 mb-6 w-full rounded-md outline-red" />
       <button className="border ms-[42%] px-[5%] rounded-md  hover:bg-blue-400" type="submit" onClick={handlesubmit}>Login</button>
       <hr  className="mt-4 "/>
       <p className="text-center">or</p>
       <div className="flex flex-row justify-center">
        <button className="bg-blue-600 mt-4 w-full py-5 border rounded-xl text-center text-red-50" onClick={loginwithgoogle}>Continue with google</button>
       </div>
       <div className="flex flex-row mt-3 justify-center">
        <p>new here? <Link to='/signup' className="text-blue-700">SignUp</Link></p>
        </div>
    </form> 
    </div>
    </>)
};
