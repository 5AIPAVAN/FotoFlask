import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import "./Reels.css";

const Carousel = (props) => {
  const [items, setItems] = useState(props.items || []);
  const [active, setActive] = useState(props.active || 0);
  const [direction, setDirection] = useState("");

  const rightClick = () => moveRight();
  const leftClick = () => moveLeft();

  useEffect(() => {
    const getReels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reels/getAllReels"
        );
        const shuffledPosts = response.data;

        setItems(shuffledPosts);

        console.log("Component loaded");
      } catch (error) {
        console.error("Error fetching reels:", error);
      }
    };

    getReels();

    console.log("items:::::" + items);
  }, []);

  const generateItems = () => {
    let generatedItems = [];
  
    for (let i = active - 2; i <= active + 2; i++) {
      let index = (i + items.length) % items.length;
      let level = active - i;
  
      generatedItems.push(
        <Item key={index} id={items[index]} level={level} />
      );
    }
  
    return generatedItems;
  };
  
  const moveLeft = () => {
    setActive((prevActive) => (prevActive - 1 + items.length) % items.length);
  };
  
  const moveRight = () => {
    setActive((prevActive) => (prevActive + 1) % items.length);
  };

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={leftClick}>
        <i className="fi-arrow-left"></i>
      </div>

      {generateItems().map((item, index) => (
        <CSSTransition
          key={index}
          classNames={direction}
          timeout={500} // Adjust the timeout as needed
        >
          {item}
        </CSSTransition>
      ))}
      <div className="arrow arrow-right" onClick={rightClick}>
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
};



const Item = ({ level, id }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
  
    const handlePlay = () => {
      if (level === 0 && video.paused) {
        // Play the video in level 0 only if it's not already playing
        video.play().then(() => {
          setIsVideoPlaying(true);
        });
      }
    };
  
    const handlePause = () => {
      setIsVideoPlaying(false);
    };
  
    // Add event listeners for play and pause events
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
  
    // Cleanup event listeners on component unmount
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [level]);
  
  const handleVideoClick = () => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (!isVideoPlaying) {
        // If the video is not playing, start playing after user interaction
        video.play().then(() => {
          setIsVideoPlaying(true);
        });
      } else {
        // If the video is playing, pause it on user interaction
        video.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const className = `item level${level}`;
  const videoUrl = id.video;
  const video_DESC = id.description;




//animation
const [hearts, setHearts] = useState([]);

  const startAnimation = () => {
    const intervalId = setInterval(() => {
      const container = document.querySelector('.anime_container');
      const newIcon = document.createElement('div');
      newIcon.classList.add('hearts');
      newIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
        <path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
        </svg>`;
      newIcon.style.left = Math.random() * 100 + 'vw';
      container.appendChild(newIcon);

      // Fade out the element after 2 seconds
      setTimeout(() => {
        newIcon.style.opacity = '0';
      }, 500);

      // Remove the element from the DOM after the transition ends
      newIcon.addEventListener('transitionend', () => {
        container.removeChild(newIcon);
      });
    }, 100);

    // Stop calling the function after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  };

  // Cleanup: Remove hearts after they fade out
  useEffect(() => {
    return () => {
      const heartsElements = document.querySelectorAll('.hearts');
      heartsElements.forEach((heart) => {
        heart.style.display = 'none';
      });
    };
  }, []);






  return (
    <div className={className} style={{ display: "flex", flexDirection: "column" }}>
      {className === "item level0" && (
        <div className="descriptionn">
          <p
            style={{
              fontSize: "20px",
              position: "fixed",
              textAlign: "left",
              marginLeft: "-448px",
              marginTop: "51px",
              width: "300px",
              height: "300px",
              overflow: "hidden",
              wordWrap: "break-word",
            }}
          >
            {video_DESC}
          </p>
        </div>
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={level===0} // Autoplay is handled in the useEffect
        loop
        onClick={handleVideoClick}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "6%",
          zIndex: -1,
        }}
      ></video>

      {className === "item level0" && (
        <div style={{ display: "flex", alignItems: "center", marginTop: "-65px" }}>
          <img
            src="https://media.istockphoto.com/id/1343130293/photo/happy-smiley-face-emoticon-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=kHSY0mERKsBirDIrE9Q4vc2wRGZbHf-AL3QYeAGfQos="
            className="PostImage" alt=""
            style={{ width: "50px", height: "50px", marginRight: "15px" }}
          />
          <p style={{ fontSize: "20px" }}>Saipavan</p>
        </div>
      )}
      {   className==="item level0" &&<div className="comment_reel"  style={{display:'flex',flexDirection:'column'}}>
  <input type="text" placeholder="Enter Your Comment Here"/>
   <h6 onClick={startAnimation}  className="anime_container" >CLICK</h6> 
  <div  className='reactions_box ' style={{display:'flex',flexDirection:'row'}}>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" id="smirking-face" width="40" height="40">
  <circle cx="256" cy="256" r="219.5" fill="#fdd402"></circle>
  <path fill="#fbbf13" d="M86.5,256C86.5,143.2287,171.5481,50.33716,281,37.9256A221.7541,221.7541,0,0,0,256,36.5C134.77344,36.5,36.5,134.7735,36.5,256S134.77344,475.5,256,475.5a221.7541,221.7541,0,0,0,25-1.4256C171.5481,461.66284,86.5,368.7713,86.5,256Z"></path>
  <path fill="#74563a" d="M226.21484 379.15088a132.73321 132.73321 0 0 1-35.84961-4.9082 7.49991 7.49991 0 0 1 4.05469-14.44141 118.45391 118.45391 0 0 0 74.48535-3.59522 116.58063 116.58063 0 0 0 40.44922-26.4414l4.94922-4.94971a7.50024 7.50024 0 0 1 10.60742 10.60645l-4.94922 4.9497a131.485 131.485 0 0 1-45.624 29.81641A133.04175 133.04175 0 0 1 226.21484 379.15088zM121.65527 224.42822a7.50216 7.50216 0 0 1-6.63672-10.98291c1.61817-3.08838 16.72559-30.291 48.3252-34.41064a62.86159 62.86159 0 0 1 34.34863 5.40576 7.49982 7.49982 0 1 1-6.25586 13.63281 47.2248 47.2248 0 0 0-26.15234-4.16455c-24.08887 3.14063-35.73145 24.11817-36.98047 26.49951A7.4982 7.4982 0 0 1 121.65527 224.42822z"></path>
  <circle cx="189.838" cy="202.174" r="19.5" fill="#74563a"></circle>
  <path fill="#74563a" d="M302.65527,224.42822a7.50216,7.50216,0,0,1-6.63672-10.98291c1.61817-3.08838,16.72559-30.291,48.3252-34.41064a62.85883,62.85883 0 0 1 34.34863 5.40576 7.49982 7.49982 0 1 1-6.25586 13.63281 47.22345,47.22345,0,0,0-26.15234-4.16455c-24.08887,3.14063-35.73145,24.11817-36.98047,26.49951A7.4982,7.4982,0,0,1,302.65527,224.42822Z"></path>
  <circle cx="370.838" cy="202.174" r="19.5" fill="#74563a"></circle>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
</svg>
</div></div>}
    </div>
  );
};



export default Carousel;
