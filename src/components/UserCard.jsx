import React from 'react'

const UserCard = ({users}) => {

console.log(users);
    const { firstName, lastName, photoUrl, skills ,age,gender,about} = users;
  return (
    <div className="card bg-base-300 w-80  shadow-xl">
      <figure>
        <img className="h-90" src={users?.photoUrl} alt="user" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}

        <p>{about}</p>
        <div className="card-actions justify-end justify-evenly">
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard