'use client'

import Test from "@/app/context/Test"
/**
 * 
 * 测试
 */
export default function Tt(){
  const handleClick = () =>{
    console.log('hh');
    
  }
  return <div>
    <Test onClick={handleClick}/>
  </div>
}