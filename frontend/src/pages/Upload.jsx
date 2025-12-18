import { useState } from "react"
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../components/context/firebase";
export default function Upload(){
  const firebase = useFirebase();
  const Navigate = useNavigate();
  const [wait,setwait] = useState(false);
    const [form,setform] = useState({
        title:"",subject:"",Type:"",sem:"",file:null,
    }
    );
    //const [file, setFile] = useState(null);
    const handlechange = (e)=>{
        setform((prevform)=>({
            ...prevform,
            [e.target.name]:e.target.value,
        }))

    }
    const handlesubmit=async (e)=>{
      if (!firebase.isloggedin) {
        alert("You need to login in first to upload sometthing ");
        Navigate('/login');
        return ;
      }
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subject", form.subject);
      formData.append("Type", form.Type);
      formData.append("sem",form.sem);
      formData.append("file", form.file);
    
      try {
        setwait(true);
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/upload`, {         //res contain meta data wbout response 
          method: "POST",
          body: formData,
          credentials:"include",
        });
        console.log(res.status);
        setwait(false);
        if(res.status == 401){
          alert("you need to log in first to upload something");
          Navigate('/login');
          setwait(false);
          return;
        }
        else{
        setwait(false);
        alert("File uploaded successfully!");
        console.log("Uploaded:",await res.json());
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Something went wrong.");
      }
      setform({title:"",subject:"",Type:"",file:null});
    }

    return (<>
    {(!wait)?
    <div className="form flex flex-col items-center text-2xl pt-[5%]">
    <form action="" onSubmit={handlesubmit} encType="multipart/form-data">
        <div className="title py-5 m-auto w-[300px] md:w-full">
        <label htmlFor="title">Title: </label>
        <input className="border md:ml-3 rounded-md" type="text" name="title" id="title" placeholder="enter name of notes/pyq" value={form.title} onChange={handlechange}/>
        </div>
        
        <div className="py-5 m-auto w-[300px] md:w-full">
        <label htmlFor="subject">Subject: </label>
        <input className="border rounded-md" type="text" name="subject" id="subject" placeholder="enter subject of notes/pyq" value={form.subject} onChange={handlechange}/>
        </div>
        <div className="py-5 m-auto w-[300px] md:w-full">
        <select required name="Type" value={form.Type} onChange={handlechange} className="  p-2 border border-gray-300 rounded">
          <option value="">Select Type</option>
          <option value="notes">Notes</option>
          <option value="pyq">Previous Year Question</option>
        </select>
        </div>
        <div className="py-5 m-auto w-[300px] md:w-full">
        <label htmlFor="sem">
            Semester: 
        </label>
        <input className="border  rounded-md" type="text" name="sem" id="sem" placeholder="enter sem of notes/pyq" value={form.sem} onChange={handlechange}/>
        </div>
        <div className="py-5 m-auto w-[300px] md:w-full">
        <label htmlFor="file">File: </label>
        <input required accept=".pdf,.doc,.docx,.png,.jpeg" className="border md:ms-2 w-[300px] rounded-md" type="file" id="file" name="file" placeholder="enter link of notes "
             onChange={(e) =>
              setform((prevform) => ({
                ...prevform,
                file: e.target.files[0],
              })) }/>
        </div>
        <div className="py-5 mx-auto">
        <button className="bg-indigo-600 text-white w-full cursor-pointer py-2 rounded-md hover:bg-indigo-700 transition" type="submit"> Submit</button>
        </div>
        </form>
        </div>:<div>
          <div className="text-center text-5xl"> Loading.... </div>
           <LinearProgress color="success" className="mt-20" />
        <LinearProgress color="secondary" className="mt-25" />
        <LinearProgress color="inherit" className="mt-30"/>
        </div>}</>
        );
}