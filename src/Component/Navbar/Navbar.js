import React from 'react'
import "./Navbar.css"
import searchIcon from "../Images/search.png";
import Notifications from "../Images/bell.png";
import Message from "../Images/message.png";
import Profileimage from "../Images/Profile.png"
import VideoIcon from "../Images/video.png"
import { Link} from "react-router-dom";
import { useDispatch, useSelector}  from 'react-redux'
import {logout} from "../ReduxContainer/UserReducer"


export default function Navbar() {

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;
  console.log(id);

const dispatch = useDispatch();
  const handleLogOut=()=>{
       dispatch(logout());
  }

  return (
    <div className='mainNavbar'>
      <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
    <div className='LogoContainer'>
              <p>FotoFlask</p>
    </div>
    </Link>
    <div>
              <div className='searchInputContainer'>
                        <img src={`${searchIcon}`} className="searchIcon" alt="" />
                        <input type="text" className='searchInput' placeholder='search your friends' name="" id="" />
              </div>
    </div>
    <div className='IconsContainer'>
              <Link to="/reels" ><img src={`${VideoIcon}`} className="Icons" alt="" /></Link>
              <Link to='/addnewpost' style={{textDecoration: 'none', color: 'black', display: 'flex', fontSize: '25px'}}><p className='Icons'>+</p></Link>
              <img src={`${Notifications}`} className="Icons" alt="" />
              <Link to='/chat'>
              <img src={`${Message}`} className="Icons" alt="" />
              </Link>
              <Link to={`/profilepage/${id}`} style={{textDecoration: 'none', color: 'black', display: 'flex'}}>
              <div style={{display:'flex' , alignItems:'center'}}>
                        <img src={`${user.user.profilepicture}`} className="ProfileImage" alt="" />
                        <p style={{margin:'0 5px'}}>{user.user.username}</p>
              </div>
              </Link>
           
              <div style={{marginRight:"30px" , marginLeft:"20px" , cursor:"pointer"}} onClick={handleLogOut}>
                <p>Logout</p>
              </div> 
    </div>
</div>
  )
}
