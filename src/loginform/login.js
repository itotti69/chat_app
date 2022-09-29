//必要なモジュールをインポート
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import firebase from 'firebase/compat/app';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false};
 
  //ログインボタンが押された時にstateのemailとpasswordの機能で認証している 
  onButtonPress() {
    const { email, password } = this.state;
    this.setState({error: '', loading: true});
 
    //ユーザー作成やログインに成功した場合と失敗した場合のstate呼び出し処理
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((this.onLoginSuccess.bind(this)))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((this.onLoginSuccess.bind(this)))
          .catch((this.onLoginFail.bind(this)));
      });
  }
 
  //ログイン成功
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }
 
  //ログイン失敗
  onLoginFail() {
    this.setState({
      loading: false,
      error: 'Authentication Failed'
    });
  }
 
  //Firebaseとの通信中はログインボタンをスピナー（ActivityIndicator)に変更しておく処理
  loadSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />
    }
 
    return (
      <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>
          ログイン
        </Text>
      </TouchableOpacity>
    )
  }
 
  //TextInputで様々なオプションに必要な情報を入力してファーム作成
  render() {
    return (
      <View>
        <View style={styles.wrap}>
          <TextInput
              placeholder="user@gmail.com"
              autoCorrect={false}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              style={styles.inputStyle}
            />
        </View>
        <View style={styles.wrap}>
          <TextInput
              secureTextEntry
              placeholder="password"
              autoCorrect={false}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              style={styles.inputStyle}
            />
        </View>
 
        <View style={styles.wrap}>
          {this.loadSpinner()}
        </View>
      </View>
    )
  }
}
 
const styles = {
  wrap: {
    padding: 10
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 30,
    borderWidth: 1,
    borderColor: '#333'
  }
}
 
export default LoginForm;