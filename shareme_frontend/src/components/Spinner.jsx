import React from 'react'
import { FidgetSpinner } from "react-loader-spinner";
const Spinner = ({message}) => {
  return (
   <div className="flex flex-col justify-center items-center h-full">
     <FidgetSpinner
     type="circle"
     color="#00BFFF"
     />
    
     <p>{message}</p>
   </div>
  )
}

export default Spinner
