import React, { useEffect, useState } from 'react'
import "./rightbar.css"
import image3 from "../Images/image3.jpg";
import ads from "../Images/ads.jpg";
import { useSelector}  from 'react-redux'
// import addfriend from "../Images/add-user.png";
import axios from "axios";
import Follow from './Follow';

export default function Rightbar() {

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;

  //const jwt_here="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njc2MmE1YzQzMDk1Y2I4YWQzZGMzYyIsInVzZXJuYW1lIjoiU0FJUEFWQU4iLCJpYXQiOjE3MDEzMjA0OTR9.3YHs-mLthGHdMRVS7SVWC0-yyhbF3CgEemL_ucXBnpU"
  const[suggestions,setSuggestions] = useState([]);

  useEffect(()=>{
    const getsuggestions =async()=>{
      try{
      const details = await axios.get(`http://localhost:5000/api/user/all/user/${id}`,{
      });
      setSuggestions(details.data);
      }catch(error){
        console.log("ERROR OCCURED IN CATCH BLOCK"+error)
      }
    }
    getsuggestions();
  },[])

  console.log(suggestions);







  return (
<div className='rightbar'>
      <div className='rightcontainer'>

        <div className='adsContainer'>
          <img src={`${ads}`} className="adsimg" alt="" />
          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>CodeDemy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy codedemy course</p>
          </div>
        </div>
        <div className='adsContainer'>
          <img src={`${image3}`} className="adsimg" alt="" />
          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>CodeDemy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy codedemy course</p>
          </div>
        </div>
        <div className='adsContainer'>
          <img src={`${image3}`} className="adsimg" alt="" />
          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>CodeDemy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy codedemy course</p>
          </div>
        </div>
        

      </div>

      <div className='rightcontainer2'>
         <h5 style={{textAlign:"start" , marginLeft:"10px"}}>Suggested for you</h5>


{
suggestions.map((item)=>{

//   return <div style={{marginTop:"-10px"}} id={item._id} >
//   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

//     <div style={{ display: 'flex', alignItems: "center" }}>
//       <img src={`${item.profilepicture}`} className="Profileimage" alt="" />
//       <div>
//         <p style={{ marginLeft: "10px" , textAlign:'start' }}>{item.username}</p>
//         <p style={{ marginLeft: "10px" , textAlign:'start' , marginTop:"-16px" , fontSize:"11px" , color:"#aaa" }}>Suggested for you</p>
//       </div>
//     </div>
  
//     <div style={{ backgroundColor: "#aaa", padding: '10px', marginRight: 13, borderRadius: "50%" , cursor:'pointer' }} >
//       <img src={`${addfriend}`} className="addfriend" alt=""  />
//     </div>
//   </div>
// </div>

return <Follow user_details={item}/>

})
}

  

      

        

      </div>


    </div>
  )
}
