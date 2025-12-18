
import { Navigate } from 'react-router-dom';
import AnimatedList from './AnimatedList'

function Browse(){
    function handleclick(index){

      
    }
    const items = ['Sem - 1', 'Sem - 2', 'Sem - 3', 'Sem - 4', 'Sem - 5', 'Sem - 6', 'Sem - 7', 'Sem - 8'];
    return(<><h1 className="text-3xl mt-15 font-serif text-center text-black-100">select your semester </h1>

<AnimatedList className="mx-auto cursor-pointer mt-20"
  items={items}
 onItemSelect={(item,index,event)=> handleclick(index,event)}
 showGradients={false}
 enableArrowNavigation={true}
  displayScrollbar={true}
/>
    </>)
};

export default Browse;