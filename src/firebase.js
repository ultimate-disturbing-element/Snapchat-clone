import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB4PERXL31j_VKA_P8DyNv0pVBjSFrZ9lg",
    authDomain: "snapchat-clone-v1.firebaseapp.com",
    projectId: "snapchat-clone-v1",
    storageBucket: "snapchat-clone-v1.appspot.com",
    messagingSenderId: "658763905643",
    appId: "1:658763905643:web:305baf603ca237dd710f2e"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,storage, provider};

