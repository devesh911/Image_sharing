import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from "react-icons/io"

const Navbar = ({searchTerm,setSearchTerm,user}) => {
  const navigate = useNavigate();
  if(!user) return null;
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 justify-center items-center">
      <div className="flex justify-start items-center w-full p-2  border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1"/> 
        <input type="text" 
        onChange={(e)=>setSearchTerm(e.target.value)}
        placeholder="search"
        value={searchTerm}
        onFocus={()=>navigate('/search')}
        className="p-2 w-full bg-white border-2 rounded-full outline-none shadow-md"
        />
        </div>
        <div className="flex gap-3">
          <Link to={`user-profile/${user?._id}`} className="rounded-full">
            <img src={user.image} alt="userimage" className="rounded-full w-14"/>
          </Link>
          <Link to="create-pin" className="bg-black text-white rounded-lg w-10 h-10 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd/>
          </Link>
        </div>
    </div>
  )
}

export default Navbar
