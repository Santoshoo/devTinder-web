// // import axios from "axios";
// // import React, { useEffect } from "react";
// // import { BASE_URL } from "../utils/constants";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addFeed } from "../utils/feedSlice";
// // import UserCard from "./UserCard";

// // const Feed = () => {
// //   const feed = useSelector((store) => store.feed);
// //  // console.log(feed)
// //   const dispatch = useDispatch();
// //   const getFeed = async () => {
// //     if (feed) return;
// //     try {
// //       const res = await axios.get(BASE_URL + "/feed",{
// //         withCredentials:true
// //       });

// //       dispatch(addFeed(res.data));
// //     } catch (err) {
// //       console.error(err);
// //     }
    
// //   };
// //   useEffect(() => {
// //     getFeed();
// //   }, []);
// //   return ( feed &&
// //     <div className="flex justify-center my-8">
    
// //       <UserCard user={feed.user[0]}/>
      
// //     </div>
// //   );
// // };

// // export default Feed;



 import React from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import { useEffect } from "react";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   console.log(feed)
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     if (feed) return;
//     try {
//       const res = await axios.get(BASE_URL + "/feed", {
//         withCredentials: true,
//       });
//       console.log(res)
//       dispatch(addFeed(res?.data));
//     } catch (err) {
//       //TODO: handle error
//       console.error(err)
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);
//   if (!feed) return;

//   if (feed.length <= 0)
//     return <h1 className="flex justify-center my-10">No new users founds!</h1>;

//   return (
//     feed && (
//       <div className="flex justify-center my-10">
//         <UserCard user={feed.user[0]} />
//       </div>
//     )
//   );
// };
// export default Feed;



// import React, { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   console.log("Feed Data:", feed);

//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     if (feed && feed.user && feed.user.length > 0) return; // Prevent unnecessary API calls
//     try {
//       const res = await axios.get(BASE_URL + "/feed", {
//         withCredentials: true,
//       });
//       console.log("API Response:", res.data);
//       dispatch(addFeed(res?.data || { user: [] })); // Ensure default structure
//     } catch (err) {
//       console.error("Error fetching feed:", err);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if (!feed || !feed.user || feed.user.length === 0) {
//     return <h1 className="flex justify-center my-10">No new users found!</h1>;
//   }

//   return (
//     <div className="flex justify-center my-10">
//       <UserCard user={feed.user[0]} />
//     </div>
//   );
// };

// export default Feed;





import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data.data));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
