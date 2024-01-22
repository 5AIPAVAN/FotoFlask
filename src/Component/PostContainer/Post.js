import React, { useEffect, useState } from 'react'
import image3 from "../Images/image3.jpg";
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import Share from "../Images/share.png";
import anotherlikeicon from "../Images/setLike.png"
import MoreOptions from "../Images/more.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import "./post.css"

export default function Post(props) {
  const userDetails2 = useSelector((state) => state.user);
  let user = userDetails2.user;
  let id = user.user._id;
  const navigate = useNavigate();


  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const details = await axios.get(`http://localhost:5000/api/user/post/user/details/${props.post.user}`);
        setUserDetails(details.data);
      } catch (error) {
        console.log("ERROR OCCURED IN CATCH BLOCK" + error)
      }
    }

    getuserdetails();
  }, [])

  const myUserId = "656762a5c43095cb8ad3dc3c";

  const [Like, setLike] = useState(props.post.likes.includes(myUserId) ? anotherlikeicon : LikeIcon);
  const [count, setCount] = useState(props.post.likes.length);

  const [Comments, setComments] = useState(props.post.comments);
  const [commentwriting, setcommentwriting] = useState('');
  const [show, setshow] = useState(false);

  //console.log(props.post);







 // console.log(userDetails);

  const addComment = async () => {
    const comment = {
      "id": `${props.post._id}`,
      "username": `${user.user.username}`,
      "writtencomment": `${commentwriting}`
    }
    setComments(Comments.concat(comment));
  }

  const handleComment = () => {
    addComment();
  }

 // console.log(Comments)

  const handleshow = () => {
    if (show === false) {
      setshow(true)
    } else {
      setshow(false)
    }
  }

  const jwt_here = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTg0NGFhYTFlZjE1OGM2ZTNjNjdlZCIsInVzZXJuYW1lIjoiVVNFUjIiLCJpYXQiOjE3MDAyODU0NDZ9.Oo2Vo_M0wmya9zQaCkWnVgkoC4jFji_HqgEri_JHgQs"

  const handleLike = async () => {
   // console.log(props.post._id);
    if (Like === LikeIcon) {
      await fetch(`http://localhost:5000/api/post/${props.post._id}/like`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            jwttoken: jwt_here
          }, body: JSON.stringify({ user: myUserId })
        })
        .then(response => {
          console.log(response)
          if (response.ok) {
            // Update state after successful API call
            setLike(anotherlikeicon);
            setCount(count + 1);
          } else {
            console.error('Failed to update like');
          }
        })
        .catch(error => {
          console.error('Error during like update:', error);
        });
        
        // await fetch(`http://localhost:5000/api/user/likedpost/${props.post._id}`,
        // {
        //   method: "PUT",
        //   headers: {
        //     'Content-Type': 'application/json',
        //     jwttoken: jwt_here
        //   }, body: JSON.stringify({ user: myUserId })
        // }).then(response => {
        //   console.log(response)
        //   if (response.ok) {
        //     console.log('successfully update like');
        //   } else {
        //     console.error('Failed to update like');
        //   }
        // })
        // .catch(error => {
        //   console.error('Error during like update in user array :', error);
        // });
      //  setLike(anotherlikeicon);
      //   setCount(count + 1);
    } else {
      await fetch(`http://localhost:5000/api/post/${props.post._id}/like`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            jwttoken: jwt_here
          }, body: JSON.stringify({ user: myUserId })
        })
        .then(response => {
          if (response.ok) {
            // Update state after successful API call
            setLike(LikeIcon);
            setCount(count - 1);
          } else {
            console.error('Failed to update like');
          }
        })
        .catch(error => {
          console.error('Error during like update:', error);
        });
      // setLike(LikeIcon)
      // setCount(count - 1);

      // await fetch(`http://localhost:5000/api/user/likedpost/${props.post._id}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       'Content-Type': 'application/json',
      //       jwttoken: jwt_here
      //     }, body: JSON.stringify({ user: myUserId })
      //   }).then(response => {
      //     console.log(response)
      //     if (response.ok) {
      //       console.log('successfully update like');
      //     } else {
      //       console.error('Failed to update like');
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error during like update in user array :', error);
      //   });
    }
  }

  return (
    <div className='PostContainer'>
      <div className='SubPostContainer'>
        <div>
          <div style={{ display: 'flex', alignItems: "center" }}>
            <img src={`${userDetails.profilepicture}`} className="PostImage" alt="" />

            <div>
              <p style={{ marginLeft: '5px', textAlign: "start" }}>{userDetails.username}</p>
              <p style={{ fontSize: "11px", textAlign: "start", marginLeft: 5, marginTop: -13, color: "#aaa" }}>Following by suman</p>
            </div>
            <img src={`${MoreOptions}`} style={{ marginRight: 16 }} onClick={() => navigate(`/postpage/${props.post._id}`)}  className="moreicons" alt="" />
          </div>
          {((props.post.image === '')&&(props.post.video === '' ) )? 
          <div className="containerr" style={{
  width: "500px",
  height: "430px",
  background: "rgb(108,68,255)",
  background: "linear-gradient(0deg, rgba(108,68,255,1) 22%, rgba(90,97,255,1) 35%, rgba(120,64,255,1) 61%, rgba(175,45,255,1) 78%)",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  padding: '20px',
  marginLeft: '12px',
  fontFamily: 'Lobster, Poppins, sans-serif', // Specify the font family
}}>
  <p style={{
    fontSize: "30px",
    color: "white",
    textAlign: 'start',
    width: "100%",
    marginTop: 0,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    whiteSpace: 'pre-line',
  }}>
    {props.post.description}
  </p>
</div>


: <p></p>
          }
          
          { ((props.post.image !== '')||(props.post.video !== ''))?
            <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{props.post.description}</p>:<p></p>
          }
      
          {props.post.image !== '' ? 
           <img src={`${props.post.image}`} className="PostImages" alt="" />: props.post.video !== '' ? <video className="PostImages" width="500" height="500" controls >
           <source src={`${props.post.video}`} type="video/mp4"/>
          </video> : ''
          }
        {/* {  props.post.image && <img src={`${props.post.image}`} className="PostImages" alt="" />} */}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <img src={`${Like}`} className="iconsforPost" onClick={handleLike} alt="" />
                <p style={{ marginLeft: "6px" }}>{count} Likes</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>
                <img src={`${CommentIcon}`} onClick={handleshow} className="iconsforPost" alt="" />
                <p style={{ marginLeft: "6px" }}>{props.post.comments.length} Comments</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: 200, cursor: "pointer" }}>
              <img src={`${Share}`} className="iconsforPost" alt="" />
              <p style={{ marginLeft: "6px" }}>Share</p>
            </div>
          </div>
          {show === true ?
            <div style={{ padding: '10px' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`${image3}`} className="PostImage" alt="" />
                <input type="text" className='commentinput' placeholder='Write your thought' onChange={(e) => setcommentwriting(e.target.value)} />
                <button className='addCommentbtn' onClick={handleComment}>Post</button>
              </div>
              {Comments.map((item) => (
                <div style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.profile === '' ?
                      <img src={`${image3}`} className="PostImage" alt="" /> : <img src={`${image3}`} className="PostImage" alt="" />
                    }
                    <p style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}>{item.username}</p>
                  </div>
                  <p style={{ marginLeft: "55px", textAlign: 'start', marginTop: -16 }}>{item.writtencomment}</p>
                  <p style={{ marginLeft: "55px", textAlign: 'start', marginTop: -10, color: "#aaa", fontSize: 11 }}>Reply</p>

                </div>

              ))}
            </div> : ''
          }
        </div>
      </div>
    </div>

  )
}
