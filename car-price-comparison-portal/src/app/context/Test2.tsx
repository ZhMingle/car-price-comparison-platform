'use client'
import React, { useContext } from 'react';
import { ThemeContext } from './Test';



// Define the component with the props type
const Test2 = () => {
  const {name, age}  = useContext(ThemeContext)
  return (
    <h3>{`${name} - ${age}`}</h3>
  )
    
};

export default Test2;
