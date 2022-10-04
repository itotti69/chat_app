import firebase from 'firebase/compat/app';

export type Message = {
    text: string;
    createdAt: firebase.firestore.Timestamp;
    userId: string;
};

export type ChatRoomUser = {
    chat_room_id: number;
    id: number;
    user_id: string;
};
export type YourUser = {
    chat_room_id: number;
    id: number;
    user_id: string;
};
export type ChatRoom = {
    id: number;
    room_name: string;
};