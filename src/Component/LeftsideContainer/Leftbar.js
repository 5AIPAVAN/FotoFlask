import React from 'react'
import "./leftbar.css"
import image3 from "../Images/image3.jpg";
import axios from "axios";
import {useEffect,useState} from 'react';
import {useSelector}  from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Leftbar() {

  const navigate = useNavigate();

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;

const jwt_here=user.jwttoken;
const [posts,setPosts] = useState([]);

useEffect(()=>{
  const getposts = async()=>{   
    try{
      const response = await axios.get(`http://localhost:5000/api/user/followingposts/${id}`,{
        headers:{
          jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
        }
      });
      // before firebase used user  setPosts(response.data.followingPosts);
      setPosts(response.data);  // include particularly .followingPosts 
                                               //otherwise it returns an data object
  }catch(error){
       console.log("ERROR OCCURED IN CATCH BLOCK "+error);
  }
  }
getposts();
},[])

console.log(posts);



  return (
    <div className='Leftbar'>
    <div className='NotificationsContainer'>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <p style={{marginLeft:"-14px"}}>Notifications</p>
                        <p style={{ color: "#aaa" , marginLeft:"40px" }}>See all</p>
              </div>
              <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , width:"120px" , textAlign:"start"}}>Saipavan like your post</p>
                        <img src={`${image3}`} className="likeimage" alt="" />
              </div>
              <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , textAlign:"start" , width:"120px"}}>Poojyanth started to following you</p>
                        <img src={`${image3}`} className="followinguserimage" alt="" />
              </div>
              <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , width:"120px" , textAlign:"start"}}>Gautham like your post</p>
                        <img src={`${image3}`} className="likeimage" alt="" />
              </div>
              <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , width:"120px" , textAlign:"start"}}>Abhiram like your post</p>
                        <img src={`${image3}`} className="likeimage" alt="" />
              </div>
            
       
    </div>

    <div className='NotificationsContainer'>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <p style={{marginLeft:"-20px"}}>Explore</p>
                        <p style={{ color: "black" , marginLeft:"40px" , cursor:'pointer'}} onClick={() => navigate(`/explore`)}>See all</p>
              </div>
              
              <div>
              <img src={`${image3}`} className="exploreimage" alt="" />
 {           
   posts.map((item)=>{
    // return item.map((postdetails)=>{
      return <img src={`${item.image}`} className="exploreimage" alt="" />
    // })
  })
  
  }

              </div>
              
    </div>

</div>
  )
}
