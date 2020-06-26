//
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCKs5TTQxtBEoNHuwpyZrfavVbbyORhIu4",
  authDomain: "monash-grade-calculator.firebaseapp.com",
  databaseURL: "https://monash-grade-calculator.firebaseio.com",
  projectId: "monash-grade-calculator",
  storageBucket: "monash-grade-calculator.appspot.com",
  messagingSenderId: "757981938395",
  appId: "1:757981938395:web:c30af0195d270438"
};

  const fire = firebase.initializeApp(firebaseConfig)

  export default fire;


//