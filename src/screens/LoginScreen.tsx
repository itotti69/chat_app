//screens/ChatScreen.tsx

//必要なモジュールをインポート

import React, {useState} from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, TextInput, ActivityIndicator, TouchableHighlight } from 'react-native';
// import   from 'react-native';
import firebase from 'firebase/compat/app';

//exportは違うファイルから呼び出せるように記述
export const LoginScreen = () => {
    // class LoginScreen extends Component {
      // function Login() {
          // state = { email: '', password: '', error: '', loading: false};
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [error, setError] = useState('');
          const [loading, setLoading] = useState(false);

          //ログインボタンが押された時にstateのemailとpasswordをfirebaseの機能で認証している
          const onButtonPress = () => {
            // this.setState({error: '', loading: true});
            setError('');
            setLoading(true);
        
            firebase.auth().signInWithEmailAndPassword(email, password)
              .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
              });
          }
        
          //上のfirebase.authでログインに成功した場合
          const onLoginSuccess = () => {
            // this.setState({
            //   email: '',
            //   password: '',
            //   loading: false,
            //   error: ''
            // });
            setEmail('');
            setPassword('');
            setLoading(false);
            setError('');
          }
        
          //上のfirebase.authでログインに失敗した場合
          const onLoginFail = () => {
            // this.setState({
            //   loading: false,
            //   error: 'Authentication Failed'
            // });
            setLoading(false);
            setError('Authentication Failed');
          }
        
          //Firebaseと通信している最中はログインボタンをスピナー(ActivityIndicator)に変更する処理
          const loadSpinner = () => {
            if (loading) {
              return <ActivityIndicator size="small" />
            }
            
            return (
              <TouchableOpacity style={{alignSelf: 'stretch', backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#007aff'}} >
                <Text style={{alignSelf: 'center', color: '#007aff',fontSize: 16, fontWeight: '600',paddingBottom: 10, paddingTop: 10}}>
                  ログイン
                </Text>
              </TouchableOpacity>
            )
          }
            return (
              <View>
                <View style={{padding: 10}}>
                  <TextInput
                      placeholder="user@gmail.com"
                      autoCorrect={false}
                      value={email}
                      onChangeText={email => setEmail('')}
                      style={{color: '#000', paddingRight: 5, paddingLeft: 5, fontSize: 18, lineHeight: 23, height: 30, borderWidth: 1, borderColor: '#333'}}
                    />
                </View>
                <View style={{padding: 10}}>
                  <TextInput
                      secureTextEntry
                      placeholder="Password"
                      autoCorrect={false}
                      value={password}
                      onChangeText={password => setPassword('')}
                      style={{color: '#000', paddingRight: 5, paddingLeft: 5, fontSize: 18, lineHeight: 23, height: 30, borderWidth: 1, borderColor: '#333'}}
                    />
                </View>
        
                <View style={{padding: 10}}>
                  {loadSpinner()}
                </View>

                <View style={{padding: 10}}>
                  <Text>aaaaaaa</Text>
                </View>
              </View>
            );
      //}
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Text>Login Screen</Text>
      // </View>
}


 
// export default LoginScreen;