//screens/ChatScreen.tsx
//必要なモジュールをインポート
import React, {useState, useEffect} from 'react';
import {
   StyleSheet,
    Button,
    SafeAreaView,
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    TouchableHighlight
   } from 'react-native';
import { getMessageDocRef, getUserId } from '../lib/firebase';
import firebase from 'firebase/compat/app';

//exportは違うファイルから呼び出せるように記述
export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [native_number, setNative] = useState('');

  //   const sendMessage = async (value: string, uid: string | undefined, nameValue: string, nativeNumber: number, passValue: string) => {
//     if (value != '') {
//         const docRef = await getMessageDocRef();
//         const newMessage = {
//             email: value,
//             userId: uid,
//             name: nameValue,
//             native: nativeNumber,
//             password: passValue
//         } as Message;
//         await docRef.set(newMessage);
        
//     } else {
//         Alert.alert('エラー', 'メッセージを入力してください');
//     }
// };

  //ログインボタンが押された時にstateのemailとpasswordをfirebaseの機能で認証している
  const onButtonPress = () => {
    setError('');
    setLoading(true);
  
  
    firebase.auth().onAuthStateChanged(async (user) => {
      //未ログイン時
      if (!user) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((onLoginSuccess))
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((onLoginSuccess))
            .catch((onLoginFail));
        });
      }
      //ログイン時
      else {
        // ログイン済みのユーザー情報があるかをチェック
        //コレクション名は'users'
        var userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (!userDoc.exists) {
          // Firestore にユーザー用のドキュメントが作られていなければ作る
          await userDoc.ref.set({
            email: user.email,
            display_name: '柴田',
            native_number: '1',
            password: '12345678',
            user_id: user.uid,
          });
        }
      }
    });
  }
        
          //上のfirebase.authでログインに成功した場合
          const onLoginSuccess = () => {
            setEmail('');
            setPassword('');
            setLoading(false);
            setError('');
          }
        
          //上のfirebase.authでログインに失敗した場合
          const onLoginFail = () => {
            setLoading(false);
            setError('Authentication Failed');
          }
        
          //Firebaseと通信している最中はログインボタンをスピナー(ActivityIndicator)に変更する処理
          const loadSpinner = () => {
            if (loading) {
              return <ActivityIndicator size="small" />
            }
            
            return (
              <TouchableOpacity onPress={onButtonPress} style={{alignSelf: 'stretch', backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#007aff'}} >
                <Text style={{alignSelf: 'center', color: '#007aff',fontSize: 16, fontWeight: '600',paddingBottom: 10, paddingTop: 10}}>
                  新規登録
                </Text>
              </TouchableOpacity>
            )
          }
            return (
              <View>
                <View style={{padding: 10}}>
                  <Text>e-mail</Text>
                  <TextInput
                      placeholder="user@gmail.com"
                      autoCorrect={false}
                      value={email}
                      onChangeText={email => setEmail(email)}
                      style={{color: '#000', paddingRight: 5, paddingLeft: 5, fontSize: 18, lineHeight: 23, height: 30, borderWidth: 1, borderColor: '#333'}}
                    />
                </View>
                <View style={{padding: 10}}>
                  <Text>Password</Text>
                  <TextInput
                      secureTextEntry
                      placeholder="Password"
                      autoCorrect={false}
                      value={password}
                      returnKeyType="done"
                      autoCapitalize="none"
                      onChangeText={(password) => setPassword(password)}
                      style={{color: '#000', paddingRight: 5, paddingLeft: 5, fontSize: 18, lineHeight: 23, height: 30, borderWidth: 1, borderColor: '#333'}}
                    />
                </View>

                <View style={{padding: 10}}>
                  <Text>English or Japanese</Text>
                  <Text>English → 1, Japanese → 2</Text>
                  <TextInput
                      autoCorrect={false}
                      value={native_number}
                      returnKeyType="done"
                      autoCapitalize="none"
                      onChangeText={(native_number) => setNative(native_number)}
                      style={{color: '#000', paddingRight: 1, paddingLeft: 1, fontSize: 18, lineHeight: 23, height: 30, borderWidth: 1, borderColor: '#333'}}
                    />
                </View>

                {/* <Button title="Sign up!!" onPress={() => onPress()} /> */}
        
                <View style={{padding: 10}}>
                  {loadSpinner()}
                </View>
              </View>
            );
};

const styles = StyleSheet.create({
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