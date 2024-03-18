import React, { useContext, useState } from 'react';
import ReactSwitch from 'react-switch';
import { AppContext } from '../context/AppContext';

function ToggleSwitch() {
  const [checked, setChecked] = useState(false);

  const{show,setShow} = useContext(AppContext);

  function handlechange(){

        setChecked(!checked);
        setShow(!show);
  }

  return (

    
          <label className='w-fit flex gap-2 mx-auto mt-8 border border-gray-400 rounded-xl px-3 py-3 cursor-pointer min-[950px]:mx-[249px]'>
            <div className='font-fredoka text-lg'>Display total after taxes</div>
            <ReactSwitch checked={checked} onChange={handlechange} className="-z-10" />
          </label>
    
  );
}

export default ToggleSwitch;