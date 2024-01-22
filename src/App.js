import './App.css';
import AddNewPost from './Component/Addnewpost/Addnewpost';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import PostPage from './Pages/PostPage/PostPage';
import Likedposts from './Pages/Likedposts/Likedposts';
import Addnewreel from './Component/AddnewReel/Addnewreel';
import React from 'react';
import { useSelector}  from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Chat from './Pages/Chat/Chat';
import ViewStoryImage from './Component/Storiescontainer/ViewStoryImage';
import Explore from './Component/Explore/Explore';
import Carousel from './Pages/Reels/Carousel';
import Animation from './Component/Animation_reels/Animation';


function App() {

  const userDetails = useSelector((state)=>state.user);
  // console.log(userDetails)
  let user = userDetails.user;
  // console.log(user.user.username);
  // console.log(user.user._id)


  return (

   
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/profilepage/:id" element={<Profile />} />
          <Route exact path="/login" element={user!== null ? <Navigate to={"/"}/> : <Login/>}/>
          <Route exact path="/addnewpost" element={<AddNewPost />} />
          <Route exact path="/postpage/:postid" element={user!== null ? <PostPage/> : <Navigate to={"/login"}/>}/>
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/get_all_liked_posts" element={<Likedposts />} />
          <Route exact path="/viewstory/:pictureid" element={< ViewStoryImage/>}/>
          <Route exact path="/explore" element={<Explore/>}/>
          <Route exact path="/animation" element={<Animation/>}/>
          <Route exact path="/reels" element={<Carousel items={
            [{video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703178916135Snapchat-1450444302.mp4?alt=media&token=9ed77aae-978b-4f05-97dc-daeec89dba14',description:'first video 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179138384VID-20211205-WA0000.mp4?alt=media&token=c1ee486e-6023-4593-bf58-cc73ebff1b4b',description:'second_video2222222222222222'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179290310VID-20220507-WA0022.mp4?alt=media&token=8659bf27-1f96-45a4-ba74-da59c226875e',description:'third_video3333333333333333333'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179345780VID-20211205-WA0042.mp4?alt=media&token=fbcfa653-8365-419e-8b81-fe73103d266d',description:'fourth_video444444444444444'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179432832Snapchat-1736359431.mp4?alt=media&token=7d3dcba3-9b3b-444e-bda3-703d01bb8cbb',description:'fifth_video55555555555'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179500001VID_20221119_114322_135.mp4?alt=media&token=5594e2da-3972-459e-aa27-8bd16dbe9501',description:'sixth_video6666666666666666666666'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179557072VID-20211205-WA0041.mp4?alt=media&token=9ac5ea8d-6c88-47e6-87a4-4c6b06c4db3c',description:'seventh_video7777777777777777'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/VID-20220118-WA0019.mp4?alt=media&token=e5770058-afe7-458d-b3cb-9f0de88cd720',description:'eighth_video888888888888888'},
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/VID-20220310-WA0087.mp4?alt=media&token=ee7c6008-b3e5-4273-9e15-c4677126605b',description:'ninth_video99999999999999999'}
      ]
        }/>}/>
           <Route exact path="/addnewreel" element={<Addnewreel/>} />
        </Routes>
      </Router>
    </div>
   
  );
}

export default App;
