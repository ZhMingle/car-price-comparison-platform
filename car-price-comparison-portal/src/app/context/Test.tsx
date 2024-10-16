'use client'
import React from 'react';
import Test2 from './Test2';

// Define a type for the props
type ButtonProps = {
  onClick: () => void;
  disabled?: boolean; // Optional prop
};

export const ThemeContext = React.createContext({name: '', age :0});

// Define the component with the props type
const Test: React.FC<ButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <ThemeContext.Provider value={{name: 'bb', age: 19}}>

    <button onClick={onClick} disabled={disabled}>
      Test
    </button>
    <Test2></Test2>
    </ThemeContext.Provider>
  );
};

export default Test;
