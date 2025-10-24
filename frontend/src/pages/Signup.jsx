
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../components/context/firebase.jsx";
export default function Signup({setauthuser}){
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [user,setuser] = useState({username:"",email:"",password:""});
        const handlechange = (e)=>{
            setuser((prevuser)=>({
                ...prevuser,
                [e.target.name]:e.target.value,
            }));
        }
        const handlesubmit= async(e)=>{
            e.preventDefault();
            // console.log("user is ",user);
            // console.log("sending user as ",JSON.stringify({username:user.username,email:user.email,password:user.password}))
            // const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/user/register`,{
            //     method:"POST",
            //     headers:{
            //         "Content-Type":"application/json",
            //     },
            //     body:JSON.stringify({username:user.username,email:user.email,password:user.password}),
            // })

            // const data = await response.json();
            // console.log("data is ",data.data);

            // setauthuser(data.data.email);
            // console.log("user registered successfully ");
            try {
                await firebase.signUpWithUsernameAndPass(user.email,user.password);
                setuser({username:"",email:"",password:""});
                navigate('/');
            } catch (error) {
                console.log("error",error);
                alert("User Not registered ");
            }
        }
        const singinwithgoogle = async(e)=>{
            firebase.googlelogin();
            navigate("/");
        }
        return( <>
        <div className="flex flex-col items-center h-[92%] justify-center">
        <form className="w-[40%] mt-10"> 
    
           <label htmlFor="username" >username</label>
           <input type="text" id="username" name="username" value={user.username} onChange={handlechange} required className="border mb-6 w-full rounded-md outline-red" />
    
    
           {/* <label htmlFor="scholar" >Scholar Number</label>
    
           <input type="text" id="scholar" name="scholar" className="border mb-6 w-full rounded-md outline-red" /> */}
    
           <label htmlFor="email" >Email</label>
           <input type="text" id="email" value={user.email} name="email" onChange={handlechange} required className="border mb-6 w-full rounded-md outline-red" />
    
           <label htmlFor="username">password</label>
           <input type="text" id="password" name="password" value={user.password} required onChange={handlechange} className="border mb-6 w-full rounded-md outline-red" />
    
           <button className="border ms-[40%] px-8 py-1 rounded-md hover:bg-blue-400" type="submit" onClick={handlesubmit}>signup</button>
        </form> 
        <hr className="mt-4"/>
        <p className="text-center">or</p>
        <div className="flex w-full flex-row justify-center">
            <button className="bg-blue-600 w-[40%] py-3 border rounded-xl text-center text-blue-100"onClick={singinwithgoogle}>continue with google</button>
        </div>
        <div className="text-center w-full mt-3">already have account? <Link to='/login' className="text-blue-700">Log in</Link></div>
        </div>
        {/* </div> */}
        </>
        )
};