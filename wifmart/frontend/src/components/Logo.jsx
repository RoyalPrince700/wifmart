import React from 'react';
import wifmart from '../assets/wifmartlogo.png'; // Navigates from components to assets




const Logo = ({ w, h }) => {
  return (
    <img
      src={wifmart}
      alt="Logo"
      style={{ width: w, height: h }}
    />
  );
}

export default Logo;
