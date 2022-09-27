import firebase from 'firebase/compat/app';

export type Message = {
    text: string;
    createdAt: firebase.firestore.Timestamp;
    userId: string;
};