import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
    const handleLogin = async () => {
      try{
        const res = await axios.post(
          BASE_URL+"/login",
         
          {
        
            emailId,
            password,
          },
          {
            withCredentials: true,
          }
        );
        // console.log(res);
        // console.log(res.user);
dispatch(addUser(res.data));
navigate("/")
      }catch(err){
        console.error(err)
      }
    };


  return (


    <div className="flex items-center justify-center my-10">
      <div className="card card-border justify-center bg-base-300 w-96">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset justify-center">
              <legend className="fieldset-legend ">Email Id:{emailId}</legend>
              <input type="text"
              value={emailId} 
              onChange={(e)=> setEmailId(e.target.value)} className="input" placeholder="" />
            </fieldset>

            <fieldset className="fieldset justify-center">
              <legend className="fieldset-legend ">Password</legend>
              <input type="text" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="input" placeholder="" />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary"
            onClick={handleLogin}>login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login