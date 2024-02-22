import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDuYS2jg-6mTpwmFo-SWO0kSDRgKi2A2gk",
    authDomain: "mychat-8d6c2.firebaseapp.com",
    projectId: "mychat-8d6c2",
    storageBucket: "mychat-8d6c2.appspot.com",
    messagingSenderId: "257122899111",
    appId: "1:257122899111:web:237738b43e07ca3b0a7782"
  };
  const app = initializeApp(firebaseConfig);
  export default firebaseConfig