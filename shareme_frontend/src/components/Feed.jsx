import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {client} from '../client'
import { searchTerm } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import {searchQuery,feedQuery} from '../utils/data'

const Feed = () => {
  const [Loading,setLoading] =useState(false);
  const [pins,setPins] = useState(null);
  const {categoryId} = useParams()
  
  useEffect(()=>{
    if(categoryId){
      setLoading(true)

      const query = searchQuery(categoryId); 
      client.fetch(query).then((data)=>{
        if(data.length>0){
                  setPins(data)
                  console.log('fired')
        }
        else{
          setPins(null)
        }
        
        setLoading(false)
      })
    }
    else{
      setLoading(true)

      

      client.fetch(feedQuery).then((data)=>{
     
          setPins(data)
          console.log('settle')
        setLoading(false)
        console.log(data)
      })
    }
  },[categoryId])

  if(Loading) return <Spinner message="we are making new pins"/>

  return (
    <div>
      {pins ? (<MasonryLayout pins= {pins} />):(
        <div className="flex justify-center items-center">
           <p>WOW! such an empty</p> 
        </div>
      ) }
    </div>
  )
}

export default Feed
 