require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "memcards-17.firebaseapp.com",
  databaseURL: "https://memcards-17.firebaseio.com",
  projectId: "memcards-17",
  storageBucket: "memcards-17.appspot.com",
  messagingSenderId: "455837639885",
  appId: "1:455837639885:web:aff25287d5600eda"
};

export default firebaseConfig;
