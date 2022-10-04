import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, AppRegistry } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat/app';
import { ChatRoomUser } from './src/types/message';
import { YourUser } from './src/types/message';
import { ChatRoom } from './src/types/message';
import Header from './src/components/Header';
import styled, { StyledComponent } from "styled-components";
// import styled from 'styled-components/native'
// import Header from './src/components/Header';
// import Footer from './src/components/Footer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

  //Detailsページ構成
function DetailsScreen({ navigation }) {
  const [roomUser, setChatRoomUser] = useState<ChatRoomUser[]>([]);
  const [yourUser, setYourUser] = useState<YourUser[]>([]);
  const [room, setRoom] = useState<ChatRoom[]>([]);

  const getMyRoom = async(user_id: string) => {
    const MyRoom = [] as ChatRoomUser[];
    const r = [] as ChatRoomUser[];
    const db = firebase.firestore();
    const db_1 = firebase.firestore();
    await db
    .collection('chat_room_users')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            MyRoom.unshift(change.doc.data() as ChatRoomUser
            );
          }    
      });
      for (let i=0; i<MyRoom.length; i++){
        if (MyRoom[i].user_id == user_id){
          r.push(MyRoom[i]); 
        }
      }
      setChatRoomUser(r);
      const chatRoom = [] as ChatRoom[];
      const Room = [] as ChatRoom[];
      db_1
      .collection('chat_room')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              chatRoom.unshift(change.doc.data() as ChatRoom);
            } 
            
        });
        for (let i=0; i<r.length; i++){
          for(let j=0; j<chatRoom.length; j++){
            if (r[i].chat_room_id == chatRoom[j].id){
              Room.push(chatRoom[j])
            }
          }
        }
        setRoom(Room);
      });
    });
  }
  useEffect(() => {
    getMyRoom("0s7ToLnokBTZ1XsGqPWL3lNrX3i2");
  }, []);

//   interface ButtonProps {
//     primary: boolean;
//   }
//   export const Button = styled.button<ButtonProps>`
//   /* Adapt the colors based on primary prop */
//   background: ${({primary}) => (primary ? 'palevioletred' : 'white')};
//   color: ${({primary}) => (primary ? 'white' : 'palevioletred')};

//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
// `;

  //ここのUIを変更
  return (
    // <View style={styles.container}>
      <SafeAreaView>
        <ExpoStatusBar style="light" />
        {/* <Header /> */}
        <View style={styles.header_rayout}>
          <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
              <Button
                title="< Home"
                // containerStyle={styles.button}
                onPress={() => {
                  navigation.navigate('Home');
                }}
              ></Button>
              {/* <CustomButton>← Home</CustomButton> */}
            </View>
            <Text style={styles.headerText}>トークリスト</Text>
            <View style={styles.rightContainer}>
            </View>
          </View>
        </View>
        <FlatList 
          data={room}  //データ
          inverted={true}
          renderItem={({ item }) =>  //表示
            <View style={styles.textView}>
              <Button 
              title={item.room_name}
              onPress={() => navigation.navigate('ChatScreen')}
              />
            </View>
          }
        />
      </SafeAreaView>
    // </View>
  ); 
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1
  // },
  headerContainer: {
    // flex: 1,  //上下均等に配置
    backgroundColor: '#f0f8ff',  //適用不可
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header_rayout: {
    backgroundColor: '#00ced1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 2,
    position: 'relative'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'brack',
    paddingBottom: 5
  },
  button: {
    backgroundColor: 'white',
    color: 'blue',
  },
  textView: {  //箱
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 2,
    marginHorizontal: 7,
    borderRadius: 5,
    // alignSelf: 'flex-start'
  },
  text: {
    fontSize: 30,
    color: "black",
    
  },
  subText: {
    fontSize: 20,
    color: "lightblue"
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

//ログイン画面
function login() {
  return <LoginScreen />;
}

function myChatScreen() {
  return <ChatScreen />;
}

const Stack = createNativeStackNavigator();
//ここが画面遷移を決める場所
function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName='Home' */}
      {/* // screenOptions={{ headerStyle: styles.header }}> */}
      {/* headerShown: falseで初期状態でヘッダーを非表示にしておく*/}
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'トークルーム' }}/>
        <Stack.Screen name="ChatScreen" component={myChatScreen} />
        <Stack.Screen name="LoginScreen" component={login} />
      </Stack.Navigator>
      {/* <Footer /> */}
    </NavigationContainer>
  );
}
export default App;

