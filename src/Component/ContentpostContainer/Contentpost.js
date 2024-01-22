import React, { useState } from 'react'
import "./contentpost.css"
import imageIcon from "../Images/gallery.png"
import VideoIcon from "../Images/video.png"

import { useSelector}  from 'react-redux'
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Contentpost() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  console.log(user);

  const [file,setFile] = useState(null);
  const [file2,setFile2] = useState(null);
  const [file3,setFile3] = useState(null);

  const [imagePre , setImagePre] = useState(null);
  const [VideoPre , setVideoPre] = useState(null);
  const [StoryPre , setStoryPre] = useState(null);

  const jwt_here = user.jwttoken;
  console.log("JWT TOKEN HEREEEE"+jwt_here)
  const [description,setDescription] = useState('');

  const handlepost =(e) =>{

    e.preventDefault();
    if(file !== null){
    const currentDate = new Date();
    const filename = currentDate.getTime()+file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage,filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
   (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await fetch("http://localhost:5000/api/post/createpost",{method:"POST",
      headers:{
        'Content-Type':'application/JSON',
        jwttoken:jwt_here 
      },
      body:JSON.stringify({description:description,image:downloadURL,video:''})
    }).then((data)=>{
      alert("IMAGE POST - SUCCESSFULLT UPLOADED ");
      window.location.reload(true);
    })
    });
  }
);
    }else if(file2!==null){


      const currentDate = new Date();
      const filename = currentDate.getTime()+file2.name;
      const storage = getStorage(app);
      const storageRef = ref(storage,filename);
  
      const uploadTask = uploadBytesResumable(storageRef, file2);
  
      uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await fetch("http://localhost:5000/api/post/createpost",{method:"POST",
        headers:{
          'Content-Type':'application/json',
          jwttoken:jwt_here 
        },
        body:JSON.stringify({description:description,image:'',video:downloadURL})
      }).then((data)=>{
        alert("VIDEO POST - SUCCESSFULLT UPLOADED ");
        window.location.reload(true);
      })
      });
    }
  );

    }else if(file3!==null){

      
      const currentDate = new Date();
      const filename = currentDate.getTime()+file3.name;
      const storage = getStorage(app);
      const storageRef = ref(storage,filename);
  
      const uploadTask = uploadBytesResumable(storageRef, file3);
  
      uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await fetch("http://localhost:5000/api/user/add/story",{method:"POST",
        headers:{
          'Content-Type':'application/json',
          jwttoken:jwt_here 
        },
        body:JSON.stringify({ newstory:downloadURL,description:'"'+description+'"'})
      }).then((data)=>{
        alert("YOUR STORY ADDED SUCCESSFULLY ");
        window .location.reload(true);
      })
      });
    }
  );

    }else{
      fetch("http://localhost:5000/api/post/createpost",{method:"POST",
      headers:{
        'Content-Type':'application/json',
        jwttoken:jwt_here 
      },
      body:JSON.stringify({description:description,image:"",video:""})
    }).then((data)=>{
      alert("TEXT POST - SUCCESSFULLT UPLOADED ");
      window.location.reload(true);
    });
    }
  }

  // console.log(file.name);

  // console.log(file2.name);


  return (
    <div>
      <div className='ContentUploadContainer'>
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <img src={`${user.user.profilepicture}`} className="profileimage" alt="" /> 
          <input type="text" className='contentWritingpart' placeholder='Write your real thought.....' onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div style={{marginLeft: '10px' }}>
        {imagePre !== null ? <img src={imagePre} style={{width:"410px" , height:'250px' , objectFit:"cover" , borderRadius:'10px'}} alt="" /> : VideoPre !== null ? <video className="PostImages" width="500" height="500" controls >
           <source src={VideoPre} type="video/mp4"/>
          </video> : ''
          }
          <div style={{display:'flex' , justifyContent:'space-between'}}>
          <div>
            <label htmlFor='file'>
              <img src={`${imageIcon}`} className="icons" alt="" />
              <input type="file" name="file" id="file" style={{display:"none"}} onChange={(e)=>[setFile(e.target.files[0]) , setImagePre(URL.createObjectURL(e.target.files[0]))]} />
            </label>
  
            <label htmlFor='file2'>
              <img src={`${VideoIcon}`} className="icons" alt="" />
              <input type="file" name="file2" id="file2" style={{display:"none"}} onChange={(e)=>[setFile(e.target.files[0]) , setVideoPre(URL.createObjectURL(e.target.files[0]))]}   />
            </label>

            <label htmlFor='file3'>
              <img src={`${imageIcon}`} className="icons" alt="" />
              <input type="file" name="file3" id="file3" style={{display:"none"}} onChange={(e)=>[setFile3(e.target.files[0]) , setStoryPre(URL.createObjectURL(e.target.files[0]))]} />
            </label>
          </div>         
            <button style={{height:"30px" ,marginRight:"12px",marginTop:"40px", paddingLeft:"20px" , paddingRight:"20px" , paddingTop:6 , paddingBottom:6 , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer"}} onClick={handlepost} >Post</button>
          </div>
        </div>
      </div>

      
    </div>
  )
}
