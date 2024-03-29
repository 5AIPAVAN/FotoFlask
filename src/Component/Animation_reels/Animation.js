
// import React, { useState, useEffect } from 'react';
// import './Animation.css';

// const Animation = () => {
//   const [hearts, setHearts] = useState([]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const container = document.querySelector('.container');
//       const newIcon = document.createElement('div');
//       newIcon.classList.add('hearts');
//       newIcon.innerHTML = `
//       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
//                  <path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
//               </svg>`;
//       newIcon.style.left = Math.random() * 100 + 'vw';
//       container.appendChild(newIcon);

//       // Fade out the element after 2 seconds
//       setTimeout(() => {
//         newIcon.style.opacity = '0';
//       }, 500);

//       // Remove the element from the DOM after the transition ends
//       newIcon.addEventListener('transitionend', () => {
//         container.removeChild(newIcon);
//       });
//     }, 100);

//     // Stop calling the function after 3 seconds
//     setTimeout(() => {
//       clearInterval(intervalId);
//     }, 3000);

//     // Cleanup: Remove hearts after they fade out
//     return () => {
//       const heartsElements = document.querySelectorAll('.hearts');
//       heartsElements.forEach((heart) => {
//         heart.style.display = 'none';
//       });
//     };
//   }, []); // Empty dependency array ensures useEffect runs only once

//   return (
//     <div className="container">
//       <h3>ANIMATION</h3>
//     </div>
//   );
// };

// export default Animation;


import React, { useState, useEffect } from 'react';
//import './Animation.css';

const Animation = () => {
  const [hearts, setHearts] = useState([]);

  const startAnimation = () => {
    const intervalId = setInterval(() => {
      const container = document.querySelector('.container');
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
    <div className="container">
      <h3>ANIMATION</h3>
      <button onClick={startAnimation}>Start Animation</button>
    </div>
  );
};

export default Animation;
