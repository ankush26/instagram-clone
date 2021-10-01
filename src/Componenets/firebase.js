import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyCcMC99sbsPQIh8WxMHKbStjYb-9yWLCOY",
  authDomain: "insta-clone-5aef2.firebaseapp.com",
  databaseURL: "https://insta-clone-5aef2-default-rtdb.firebaseio.com",
  projectId: "insta-clone-5aef2",
  storageBucket: "insta-clone-5aef2.appspot.com",
  messagingSenderId: "540827696719",
  appId: "1:540827696719:web:4aaeb0690457e5e66df43a"
});

const auth=firebase.auth();
const storage=firebase.storage();

export {storage,auth};
