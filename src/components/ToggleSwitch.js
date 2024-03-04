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
    <div>
      <ReactSwitch
        checked={checked}
        onChange={handlechange}
      />
    </div>
  );
}

export default ToggleSwitch;