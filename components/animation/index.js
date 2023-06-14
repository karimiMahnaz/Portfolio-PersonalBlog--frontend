import  React, { useState } from 'react';

import styles from "./animation.module.css";

const Animation = () => {

    return ( 
        <div className={styles.container} >

        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">

        <defs>
            <radialGradient id="myGradient9">
              <stop offset="10%" stopColor="darkblue" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="30" cy="55" r="20" fill="url(#myGradient9)" className={styles.animate0}/>

          <defs>
          <radialGradient id="myGradient8">
              <stop offset="10%" stopColor="purple" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="10" r="15" fill="url(#myGradient8)" className={styles.animate0}/>

          <defs>
            <radialGradient id="myGradient7">
              <stop offset="10%" stopColor="green" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="80" cy="10" r="10" fill="url(#myGradient7)" className={styles.animate}>
            <animate
              attributeType="XML"
              attributeName="r"
              from="0"
              to="10"
              dur="5s"
              fill="freeze"
            />
          </circle>

          <defs>
          <radialGradient id="myGradient6">
              <stop offset="10%" stopColor="orange" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="180" r="15" fill="url(#myGradient6)" className={styles.animate0}/>

          <defs>
          <radialGradient id="myGradient5">
              <stop offset="10%" stopColor="blue" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="220" cy="150" r="20" fill="url(#myGradient5)" className={styles.animate0}/>

          <defs>
          <radialGradient id="myGradient4">
              <stop offset="10%" stopColor="mediumslateblue" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="170" r="10" fill="url(#myGradient4)" className={styles.animate}/>

          <defs>
          <radialGradient id="myGradient10">
              <stop offset="10%" stopColor="greenyellow" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="120" r="10" fill="url(#myGradient10)" className={styles.animate}/>

          <defs>
            <radialGradient id="myGradient0">
              <stop offset="10%" stopColor="pink" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="180" cy="18" r="17" fill="url(#myGradient0)"  className={styles.animate0}/>

          <defs>
            <radialGradient id="myGradient1">
              <stop offset="10%" stopColor="yellow" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="30" r="10" fill="url(#myGradient1)"  className={styles.animate1}/>    

          <defs>
            <radialGradient id="myGradient2">
              <stop offset="10%" stopColor="red" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="5" cy="0" r="15" fill="url(#myGradient2)"  className={styles.animate2}/>
       
          <defs>
            <radialGradient id="myGradient3">
              <stop offset="10%" stopColor="aqua" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <circle cx="80" cy="60" r="15" fill="url(#myGradient3)"  className={styles.animate2}/>
       
         
          </svg>
         
        </div>
    
    );
}
 
export default Animation;