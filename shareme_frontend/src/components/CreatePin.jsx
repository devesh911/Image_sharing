import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';

import {client} from '../client';
import Spinner from './Spinner';
import {categories} from '../utils/data';

const CreatePin = ({user}) => {

  const [title,setTitle] = useState('');
  const [about,setAbout] = useState('');
  const [loading, SetLoading] = useState(false);
  const [destination,setDestination] = useState('');
  const [fields,setFields] = useState(null);
  const [category,setCategory] = useState(null);
  const [imageAsset,setImageAsseet] = useState(null);
  const [wrongImageType,setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) =>{
    const {type,name} = e.target.files[0]

    if(type==='image/png' || type==='image/svg' || type==='image/jpeg' || type==='image/gif' || type==='image/tiff'){

      setWrongImageType(false)
      SetLoading(true)
      client.assets.upload('image',e.target.files[0],{contentType:type,filename:name})
      .then((document)=>{
        setImageAsseet(document);
        SetLoading(false);
        console.log(document)
      })
      .catch((error)=>{
        console.log('image upload error')
      })
    }
    else{̀
      setWrongImageType(true)
    }
  }
  
  const savePin = () =>{

    if(title && about && destination && imageAsset?._id && category ){
      const doc = {
        _type : 'pin',
        title,
        about,
        destination,

        image : {
          _type :'image',
          asset : {
            _type : 'refrence',
            _ref: imageAsset?._id
          }
        },

        userId : user._id,
        postedBy : {
          _type:'postedBy',
          _ref:user._id
        },
        category

      }

      client.create(doc).then(()=>{
        navigate('/')
      })
    }
    else{
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  }

  return (
   <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 ">
     {fields && (
       <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please fill all fields</p>
     )}
  
   <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full rounded-lg lg:h-800 lg:mb-30">

     <div className="bg-secondaryColor p-3 flex flex-0.7 w-full ">
       <div className="flex items-center justify-center  flex-col border-2 border-dotted border-gray-300 p-3 w-full lg:h-685">

      {loading && <Spinner/>}
      {wrongImageType && <p>Wrong image type</p> }
      {!imageAsset ?(
      <label>
        <div className="flex flex-col items-center justify-center h-full cursor-pointer">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-3xl">
                <AiOutlineCloudUpload/>
              </p>
              <p>Click to upload</p>
            </div>
            <p className="mt-32 text-gray-400 ">
             use hi-quality JPEG, SVG, PNG, GIF less than 20 MB
            </p>
        </div>
        <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
      </label>
      ):(
       <div className="relative h-full">
         <img src={imageAsset?.url} alt="uploaded image" className=" h-full w-full"/>
         <button
         type="button"
         className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md  transition-all duration-500 ease-in-out"
         onClick={()=>setImageAsseet(null)}
        >
           <MdDelete/>
         </button>
       </div>
      )}
       </div>
     </div>

     <div className="flex flex-1 flex-col  gap-6 lg:pl-5 mt-5 w-full">
       <input type="text" 
       value={title}
       onChange = {(e)=>setTitle(e.target.value)}
       placeholder="Add you title"
       className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
       />
       {user && (
         <div className="flex gap-2 m-2 items-center bg-white rounded-lg">
           <img src={user.image} alt="" className="w-10 h-10 rounded-full"/>
           <p className="font-bold">{user.userName}</p>
         </div>
       )}
       <input type="text" 
       value={about}
       onChange = {(e)=>setAbout(e.target.value)}
       placeholder="Discription"
       className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
       />
        <input type="text" 
       value={destination}
       onChange = {(e)=>setDestination(e.target.value)}
       placeholder="Addd a destination link"
       className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
       />
       <div className="flex flex-col">
         <div>
           <p className="mb-2 font-semibold text-lg sm:text-xl">
            choose pin category
           </p>
           <select name="" id=""
              onChange = {(e)=>setCategory(e.target.value)}
              className="outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
           >

             <option value="other" className="bg-white">select category</option>
             {categories.map((category)=>(
               <option className="text-base  border-0">
                 {category.name}
               </option>
             ))}
           </select>
           <div className="flex justify-end items -end mt-5 ">

             <button
              type="button"
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              onClick = {savePin}
             >
               Save pin
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>

   </div>
  )
}

export default CreatePin
