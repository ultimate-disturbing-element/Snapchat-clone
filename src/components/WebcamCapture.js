import {  RadioButtonUnchecked } from '@material-ui/icons';
import React, { useRef , useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Webcam from 'react-webcam'
import { setCameraImage } from '../features/cameraSlice';
import '../styles/WebcamCapture.css';

const videoConstraints = {
    width:250,
    height:400,
    facingMode:"user",
}

const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const capture = useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
          dispatch(setCameraImage(imageSrc));
         history.push('/preview');
        },
        [webcamRef],
    )
    return (
        <div className="webcamCapture">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUnchecked className="webcamCapture_button" onClick={capture} fontSize="large"/>
        </div>
    )
}

export default WebcamCapture
