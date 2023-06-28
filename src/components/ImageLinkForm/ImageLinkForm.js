import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f3">
                {'This magic brain will detect faces in your picture. Git it try'}
            </p>
            <div className="center">
                <div className="pattern center form pa4 br3 shadow-5">
                    <input className="f4 w-70 pa2 center" type="text" onChange={onInputChange} />
                    <button className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;