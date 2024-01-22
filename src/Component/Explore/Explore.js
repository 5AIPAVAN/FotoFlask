import React from 'react'
import image3 from "../Images/image3.jpg";
import "./explore.css"
import Navbar from '../Navbar/Navbar';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const navigate = useNavigate();
  const [exploreposts , setExplorePosts] = useState();

   // Fisher-Yates shuffle algorithm
   const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(()=>{

    const getexplore = async() =>{
      const response = await axios.get(`http://localhost:5000/api/post/explore`);
      // console.log("EXPLORE POSTS "+ response.data);
      // setExplorePosts(response.data);
      const shuffledPosts = shuffleArray(response.data);
      setExplorePosts(shuffledPosts);
    }
    getexplore();
  },[])


  console.log(exploreposts)


  return (
    <div>
<Navbar/>
<div className="row-md-3 explore">


{           
   exploreposts &&  exploreposts.map((item)=>{
    // return item.map((postdetails)=>{
      return <img src={`${item.image}`} className="exploreimage1" alt="" onClick={() => navigate(`/postpage/${item._id}`)} />
    // })
  })
  
  }

</div>
    
      
    </div>
  )
}
