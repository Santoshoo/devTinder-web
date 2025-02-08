import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } 
    catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className=" flex justify-center my-12">
        <div className="flex items-center justify-center mx-10">
          <div className="card card-border justify-center bg-base-300 w-96">
            <div className="card-body ">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset justify-center">
                  <legend className="fieldset-legend ">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                    placeholder=""
                  />
                </fieldset>

                <fieldset className="fieldset justify-center">
                  <legend className="fieldset-legend ">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                    placeholder=""
                  />
                </fieldset>
                <fieldset className="fieldset justify-center">
                  <legend className="fieldset-legend ">Photo Url</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input"
                    placeholder=""
                  />
                </fieldset>
                <fieldset className="fieldset justify-center">
                  <legend className="fieldset-legend ">Age</legend>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                    placeholder=""
                  />
                </fieldset>
                {/* <fieldset className="fieldset justify-center">
                  <legend className="fieldset-legend ">About</legend>
                  <textarea className="textarea" placeholder="about"></textarea>

                 
                </fieldset> */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea h-24"
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                  <div className="fieldset-label">Optional</div>
                </fieldset>
                <fieldset className="fieldset justify-center">
                  <legend className="fieldset-legend ">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input"
                    placeholder=""
                  />
                </fieldset>
              </div>
              <p className="text-red-600 ">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            users={{ firstName, lastName, age, gender, photoUrl, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
