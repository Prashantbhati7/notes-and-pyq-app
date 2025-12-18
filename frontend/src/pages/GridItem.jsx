import { Link } from "react-router-dom";
export default function GridItem({note}){
return (
<div className="bg-white p-4 py-7 mt-4 shadow-xl rounded-md">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-[18px]">Subject: {note.subject}</p>
              <p>Type: {note.Type}</p>
              <Link to={note.file} target="_blank" rel="noreferrer" className="text-blue-600 cursor-pointer underline mt-2 inline-block">
                View/Download
              </Link>
              <p className="mt-4 text-slate-400">uploaded By:- {note.UploadedBy}</p>
            </div>
);
}