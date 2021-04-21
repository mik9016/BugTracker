import firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  
};
// Initialize Firebase

export const fire = firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export {projectStorage};
