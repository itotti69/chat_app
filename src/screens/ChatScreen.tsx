//screens/ChatScreen.tsx

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Button,
    FlatList,
    Alert,
    Platform,
    StatusBar
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat/app';
import { getMessageDocRef, getUserId } from '../lib/firebase';
import { Message } from '../types/message';
import { MessageItem } from '../components/MessageItem';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

//exportは違うファイルから呼び出せるように記述
export const ChatScreen = () => {
    const [text, setText] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [userId, setUserId] = useState<string | undefined>();

    //asyncは非同期処理の文.ただ処理が終わるまで待つ
    const sendMessage = async (value: string, uid: string | undefined) => {
        if (value != '') {
            const docRef = await getMessageDocRef();
            const newMessage = {
                text: value,
                createdAt: firebase.firestore.Timestamp.now(),
                userId: uid
            } as Message;
            await docRef.set(newMessage);
            setText('');
        } else {
            Alert.alert('エラー', 'メッセージを入力してください');
        }
    };

    const firebaseConfig = {
        
    };

    const getMessages = async () => {
        const messages = [] as Message[];
        const db = firebase.firestore();
        await db
            .collection('messages')
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        messages.unshift(change.doc.data() as Message);
                    }
                });
                setMessages(messages);
            });
        
    };

    const signin = async () => {
        const uid = await getUserId();
        setUserId('fVKSfUj7MMcuHQr302oBaFrgYgG2');
    };

    useEffect(() => {
        signin();
        getMessages();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="light" />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior="padding"
            >
                <FlatList
                    style={styles.messagesContainer}
                    data={messages}
                    inverted={true}
                    renderItem={({ item }: { item: Message }) => (
                        <MessageItem userId={userId} item={item} />
                    )}
                    keyExtractor={(_, index) => index.toString()}
                />
                <View style={styles.inputTextContainer}>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(value) => {
                            setText(value);
                        }}
                        value={text}
                        placeholder="メッセージを入力してください"
                        placeholderTextColor="#777"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                    />
                    <Button
                        title="send"
                        color="#007AFF"
                        onPress={() => {
                            sendMessage(text, userId);
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    keyboardAvoidingView: {
        width: '100%',
        flex: 1
    },
    messagesContainer: {
        width: '100%',
        padding: 10
    },
    inputTextContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    inputText: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        height: 32,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10
    }
});