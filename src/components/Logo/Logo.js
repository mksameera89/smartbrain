import React from "react";
import Tilt from 'react-parallax-tilt';
import brainIcon from './Logo.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{display: "flex", justifyContent: 'flex-right'}}>
            <Tilt className="parallax-effect br2 shadow-2" perspective={500} style={{height: '150px', width: '150px'}}>
                <div className="inner-element pa4" >
                    <img src={brainIcon} alt="brain" ></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;