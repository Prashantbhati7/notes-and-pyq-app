import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Squares from './Squares';
import GridItem from './GridItem';
export default function Semnotes() {
  const { sem } = useParams();
  const [notes, setnotes] = useState([]);
  const [loading, setloading] = useState(true);
  const Navigate = useNavigate();
  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/notes`,{
          method:"GET",
          credentials:"include",
        });
        if(res.status==401) {
          alert("you need to login first to perform this function");
          Navigate('/login');
        }
        else{
        const data = await res.json();
        console.log("all notes are ", data);
        const filtered = data.filter(note => note.sem === sem);
        console.log("filterednotes are ", filtered);
        setnotes(filtered);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setloading(false);
      }
    }

    fetchNotes();
  }, [sem]);

  return (<div className="h-full w-full">
    <p className="text-2xl border shadow-indigo-500/50 bg-indigo-300 text-center font-bold pb-4">📘 Notes for Semester {sem}</p>

    {(loading) ? (<div className="h-[80vh] flex flex-row justify-center items-center"> 
      <CircularProgress size="5rem" />
      <div className=" text-4xl text-center text-black">Loading fetching from server.... </div> </div>) : (notes.length == 0) ? <Squares
      speed={0.3}
      squareSize={50}
      direction='diagonal'
      borderColor='#909efc'
      hoverFillColor='#7c88cc'
    >
    </Squares> :
      (
        <div className="grid h-[30%] mx-3 grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map(note => (
            // <div key={note._id} className="bg-white p-4 py-7 mt-4 shadow rounded">
            //   <h2 className="font-semibold">{note.title}</h2>
            //   <p>Subject: {note.subject}</p>
            //   <p>Type: {note.Type}</p>
            //   <a href={note.file} target="_blank" rel="noreferrer" className="text-blue-600 underline mt-2 inline-block">
            //     View/Download
            //   </a>
            // </div>
            <GridItem key={note._id} note={note} ></GridItem>
          ))}
        </div>
      )
    }
  </div>)
}
