import { Link } from "react-router-dom";
import BlurText from "./BlurText";
export default function Home (){
  return(
    <>
    <div className="flex flex-col">
        <BlurText
          text="Collaborate. Contribute. Conquer your syllabus"
          delay={150}
          animateBy="words"
          direction="top"
  //onAnimationComplete={handleAnimationComplete}
  className="text-3xl mt-[10%] mx-auto"
        />
        <BlurText
          text="Access previous year questions, study notes, and upload your own to help your batchmates."
          delay={250}
          animateBy="words"
          direction="bottom"
  //onAnimationComplete={handleAnimationComplete}
  className="text-2xl mt-[5%] mx-auto"
/>
        </div>
<div className="redirection mt-[5%] flex justify-center md:flex-row">
    
    <Link to="/browse" className="browse transition active:scale-75  duration-400 ease-in-out   hover:bg-blue-500 hover:text-stone-100  rounded-xl bg-cyan-500 px-8 py-3  mx-3 shadow-lg outline-indigo-600 shadow-cyan-500/50">Browse</Link>
    <Link to="/upload" className="upload active:scale-75 transition  duration-300 ease-in-out   hover:bg-green-600 hover:text-stone-50 rounded-xl bg-green-500 px-8 py-3 mx-3 shadow-lg shadow-green-400/70">Upload</Link>
      </div>
<div className="aboutus">
    
    </div>
</>
  );
}