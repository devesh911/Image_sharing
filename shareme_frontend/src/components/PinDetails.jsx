import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { client, urlFor } from '../client';
import { Link, useParams } from 'react-router-dom';
import { MasonryLayout } from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner'
const PinDetails = ({ user }) => {

  const { pinId } = useParams();

  const [pinDetail, setPinDetail] = useState();
  const [pins, setPins] = useState();
  const [comment, setComments] = useState('');
  const [addingComment, setAddingComments] = useState(false);


  const fetchPinDetails = () => {

    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).
        then((data) => {
          setPinDetail(data[0]);
          if (data[0]) {
            query = pinDetailMorePinQuery(data[0])

            client.fetch(query)
              .then((res) => {
                setPins(res);
                console.log('response', res);

              })

          }
        })
    }
  }
  useEffect(() => {

    fetchPinDetails();
    console.log(pinDetail)
  }, [pinId])


  if (!pinDetail) return <Spinner message="loading" />

  return (
    <div className="flex xl:flex-row flex-col m-auto bg-white w-4/5" style={{ maxWidth: '1500', borderRadius: '32px' }}>

      <div className="flex justify-center items-center md:items-start flex-initial shadow-md-l">
        <img
              className="rounded-l-3xl  "

              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620 ">
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 items-center">

             <a  href={`${pinDetail.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                 className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md hover:outline-none "
              >
                <MdDownloadForOffline/>
              </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PinDetails
