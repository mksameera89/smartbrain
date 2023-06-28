import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    if(imageUrl){
    return(
        <div className="center ma">
            <div className="absolute mt2" style={{ maxWidth: 700 }}>
                <img id="imageInput" src={imageUrl} alt='face' />
                <div className="bounding-box" style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right:box.rightCol}}></div>    
            </div>
        </div>
    )
    }
}

export default FaceRecognition;