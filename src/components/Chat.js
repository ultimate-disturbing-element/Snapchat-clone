import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ReactTimeago from 'react-timeago';
import { selectImage } from '../features/appSlice';
import { db } from '../firebase';
import '../styles/Chat.css';

const Chat = ({id,username,timestamp,read,imageUrl,profilePic}) => {
const dispatch = useDispatch();
const history = useHistory();
    const open = () => {
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read:true,
            },{merge:true});
            history.push('/chats/view');
        }
    }

    return (
        <div onClick={open} className="chat">
            <Avatar className="chat_avatar" src={profilePic}/>
            <div className="chat_info">
                <h4>{username}</h4>
                <p>{ !read && 'Tap to view - '} <ReactTimeago date= {new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>
            {!read && <StopRounded className="chat_readIcon"/>}
        </div>
    )
}

export default Chat
