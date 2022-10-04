//screens/ChatScreen.tsx
//必要なモジュールをインポート
//ChatScreen.tsxを参照
import React, {useState, useEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
  const [name, setName] = useState('');

  //ログインボタンが押された時にstateのemailとpasswordをfirebaseの機能で認証している
  const onButtonPress = () => {
    setError('');
    setLoading(true);
  
    //ログインチェック（ユーザー登録されているかどうか）
    firebase.auth().onAuthStateChanged(async (users) => {
      //未ログイン時
      if (!users) {
        //emailとpasswordでログイン
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((onLoginSuccess))  //ログイン成功
        .catch(() => {  //ログイン失敗
          //新規登録時にアカウントを作成して、Authenticationに登録
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((onLoginSuccess))
            .catch((onLoginFail));  //今失敗の状態(Alert出現)
        });
      }
      //ログイン時
      else {
        //ログイン済みのユーザー情報があるかをチェック
        //コレクション名は'users'
        //user.から取得できるのは、Authenticationの表にあるemailとUIDだけ
        var userDoc = await firebase.firestore().collection('users').doc(users.uid).get();
        if (!userDoc.exists) {
          // Firestore にユーザー用のドキュメントが作られていなければ作る
          await userDoc.ref.set({
            email: users.email,  //Authenticationから取ってきたemailアドレスをデータベースに登録
            display_name: '柴田',  //(仮)ここをTextInputから取ってきた値に変えたい
            native_number: '1',  //(仮)ここをTextInputから取ってきた値に変えたい
            password: '12345678',  //(仮)ここをTextInputから取ってきた値に変えたい
            user_id: users.uid,  //Authenticationから取ってきたUIDをデータベースに登録
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
    setName('');
    setNative('');
  }
        
  //上のfirebase.authでログインに失敗した場合
  const onLoginFail = () => {
    setLoading(false);
    setError('Authentication Failed');
    alert('登録できません');
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

  //ここがrender部分
  return (
    <View>
      <View style={{padding: 10}}>
        <Text>e-mail</Text>
        <TextInput
            placeholder="user@gmail.com"
            autoCorrect={false}
            value={email}
            autoCapitalize="none"
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
        <Text>Name</Text>
        <TextInput
            placeholder="Name"
            autoCorrect={false}
            value={name}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
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