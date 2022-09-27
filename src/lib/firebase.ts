import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAhIc94X_1nb9KT7XwGpxeFzjh-tyErkyI",
    authDomain: "chatapp-85835.firebaseapp.com",
    projectId: "chatapp-85835",
    storageBucket: "chatapp-85835.appspot.com",
    messagingSenderId: "467085577805",
    appId: "1:467085577805:web:bb50d13a57c2928713d604"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const getMessageDocRef = async () => {
    return await firebase.firestore().collection('messages').doc();
};

export const getUserId = async () => {
    const userCredential = await firebase.auth().signInAnonymously();
    return userCredential.user?.uid;
};