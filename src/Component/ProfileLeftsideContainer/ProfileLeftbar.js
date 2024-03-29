import React,{useState,useEffect} from 'react'
import "./profileleftbar.css"
import image3 from "../Images/image3.jpg";
import axios from "axios"
import { useSelector}  from 'react-redux'
import { useLocation } from 'react-router-dom';
import { Link} from "react-router-dom";

export default function ProfileLeftbar() {

  let location = useLocation();
  let loc_id =location.pathname.split("/")[2];

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;
  let username = user.user.username;
  const jwt_here = user.user.jwttoken;
  // let followerscount = user.user.followers.length;
  // let followingcount = user.user.following.length;
  // let profilepic = user.user.profilepicture;

  // const myUserId="656762a5c43095cb8ad3dc3c";

  const [user_details,setUser_Details] = useState([]);

  useEffect(()=>{
    const getuserdetails =async()=>{
      try{
      const details = await axios.get(`http://localhost:5000/api/user/post/user/details/${loc_id}`);
      setUser_Details(details.data);
      }catch(error){
        console.log("ERROR OCCURED IN CATCH BLOCK"+error)
      }
    }

    getuserdetails();
  },[])

console.log(user_details);

  const [followings,setFollowings] = useState([]);

  useEffect(()=>{
    const getfollowings=async()=>{
    try{   
        const response = await axios.get(`http://localhost:5000/api/user/get/followings/${id}`)
        // console.log("RESS :"+response)
        setFollowings(response.data);
        }catch(error){
          console.log("SOME ERROR IN CATCH BLOCK "+error);
        }
      }
     getfollowings();
  }
  ,[]);
  console.log("FFF")
  console.log(followings);

  let followerscount = user_details?.followers?.length;
  let followingcount = user_details?.following?.length;
  let profilepic = user_details?.profilepicture;

 
  const [Follow,setUnFollow] = useState([user.user.following.includes(loc_id) ? "UnFollow" : "Follow" ]);

// const handleFollow=async()=>{
//   await fetch(`http://localhost:5000/api/user/follow/${id}`,{method:"PUT" ,
//   headers:{
//     'Content-Type':'application/json',
//     jwttoken:jwt_here
//   }, body: JSON.stringify({ user:user.user._id})})
//   setUnFollow("UnFollowed")
// }
 
const handleFollow = async()=>{
  if(Follow === "Follow"){
    await fetch(`http://localhost:5000/api/user/follow/${loc_id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , jwttoken:jwt_here} , body:JSON.stringify({user:`${user.user._id}`})})
    setUnFollow("UnFollow")
  }else{
    await fetch(`http://localhost:5000/api/user/follow/${loc_id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , jwttoken:jwt_here} , body:JSON.stringify({user:`${user.user._id}`})})
    setUnFollow("Follow")
  }
}




  return (
    <div className='ProfileLeftbar'>

      <div className='NotificationsContainer'>


        <img src={`${profilepic}`} className="ProfilepageCover" alt="" />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: -30 }}>
          <img src={`${profilepic}`} className="Profilepageimage" alt="" />
          <div>
            <p style={{ marginLeft: 6, marginTop: 20, color: "black", textAlign: 'start' }}>{user_details.username}</p>
            <p style={{ marginLeft: 6, color: "black", textAlign: "start", marginTop: -16, fontSize: 11 }}>Software Developer</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>Followings</p>
          <p style={{ color: "black", marginRight: 20, fontSize: "12px", marginTop: 17 }}>{followingcount}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -20 }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>Followers</p>
          <p style={{ color: "black", marginRight: 20, fontSize: "12px", marginTop: 17 }}>{followerscount}</p>
        </div>
        <div style={{ marginTop: -20 }}>
          {/* <h5 style={{ color: "black", marginLeft: 10, fontSize: "14px", marginRight: 30, marginTop: 30, textAlign: "start" }}>User bio</h5> */}
          <p style={{ color: "black", fontSize: "12px", marginTop: -20, textAlign: "start", marginLeft: "10px" }}>I would rather be despised of who I am, rather than loved by who I am not.</p>
        </div>
        { user.user._id !== loc_id ? <div onClick={handleFollow}> <button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }}>{Follow}</button></div> : <button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }}>Edit Bio</button> }




      </div>

      <div className='NotificationsContainer'>
        <h3>Followings</h3>
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <p style={{ marginLeft: 10 }}>Friends</p>
          <p style={{ marginRight: 10, color: "#aaa" }}>See all</p>
        </div>
        <div style={{ display: 'flex', flexWrap: "wrap", marginLeft: 5 }}>


{
  //he issue you're facing might be because you're not explicitly returning the JSX inside the map function. In arrow functions, if you use curly braces {}, you need to use the return statement explicitly. If you want to use parentheses (), you can skip the return statement.
followings.map((item)=>(
  <Link to={`/profilepage/${item.others._id}`} key={item.others._id}>
  <div style={{ marginLeft: 4, cursor: "pointer" }}>
  <img src={`${item.others.profilepicture}`} className="friendimage" alt="" />
  <p style={{ marginTop: -2 }}>{item.others.username}</p>
</div>
</Link>

))
}




        </div>

      </div>

    </div>
  )
}
