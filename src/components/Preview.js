import {  AttachFile, Close, CreateOutlined, Crop, MusicNote, Note, Send, TextFields, Timer } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetCameraImage, selectCameraImage } from '../features/cameraSlice';
import '../styles/Preview.css';
import { v4 as uuid} from "uuid";
import {db,storage} from '../firebase';
import firebase from 'firebase';
import { selectUser } from '../features/appSlice';


const Preview = () => {
    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(()=>{
        if(!cameraImage){
            history.replace('/')
        }
    },[cameraImage,history]);

    const closePreview = () => {
        dispatch(resetCameraImage());
     
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage,"data_url");

        uploadTask.on('state_changed',null,(error)=>{
            console.log(error);
        },
        () => {
            storage
            .ref('posts')
            .child(id)
            .getDownloadURL()
            .then((url)=>{
                db.collection('posts').add({
                    imageUrl:url,
                    username:'Abhi',
                    read:false,
                    profilePic:user.profilePic,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp()
                });
                history.replace("/chats");
            })
        }
        );
    }

    return (
        <div className="preview">
            <Close className="preview_close" onClick={closePreview}/>
            <div className="preview_toolbarRight">
                <TextFields/>
                <CreateOutlined/>
                <Note/>
                <MusicNote/>
                <AttachFile/>
                <Crop/>
                <Timer/>

            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview_footer">
                <h2>Send Now</h2>
                <Send fontSize="small" className="preview_sendIcon"/>
            </div>
        </div>
    )
}

export default Preview
