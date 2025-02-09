import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests,removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const dispatch=useDispatch();
  const requests=useSelector((store)=>store.requests)

  const reviewRequest=async(status,_id)=>{
    try{
const res = await axios.post(BASE_URL + "/request/review/"+status+ "/"+_id,{},{
  withCredentials:true
});
dispatch(removeRequest(_id))
    }catch(error){
      console.log(error);
    }
  }


  const fetchRequests=async()=>{
    try{

      const res = await axios.get(BASE_URL + "/user/request/received",{
        withCredentials:true
      });
      dispatch(addRequests(res.data.data))

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
fetchRequests()
  },[])
  if (!requests) return;

  if (requests.length === 0) return <h1 className='font-bold flex justify-center'> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 justify-evenly rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left  ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-active btn-primary mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
              <button className="btn btn-active btn-secondary mx-2" onClick={()=>reviewRequest("accepted", request._id)} >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests