import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyADt5oGqYN3BWqp5dx9xF-udRjKik_lapQ",
    authDomain: "store-db-b3ba2.firebaseapp.com",
    databaseURL: "https://store-db-b3ba2.firebaseio.com",
    projectId: "store-db-b3ba2",
    storageBucket: "store-db-b3ba2.appspot.com",
    messagingSenderId: "321667369024",
    appId: "1:321667369024:web:77c02fe9f03a68a37d77a5",
    measurementId: "G-219GP4X3Q9"
  }


export const createUserProfileDocument = async (userAuth, additionalData) => {
     if(!userAuth) return;

     const userRef = firestore.doc(`users/${userAuth.uid}`);

     const snapShot = await userRef.get();

     if(!snapShot.exists){
       const { displayName, email} = userAuth;
       const createdAt = new Date();

       try{
         await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData
         })

       }catch(error){
          console.log('error created user', error.message)
       }

     }
     return userRef;


}  

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;