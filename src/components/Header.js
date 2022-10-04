import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
// import { NavigationContainer } from '@react-navigation/native';


const Header = () => {
  const { headerText, header } = styles;
  return (
    <View style={header}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Button
            title="< Home"
            style={styles.button}
            // onPress={() => {
            //   navigation.navigate('Home');
  // }}
          ></Button>
        </View>
        <Text style={headerText}>トークリスト</Text>
        <View style={styles.rightContainer}>
          
        </View>
      </View>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: 'white',
    color: 'blue',
  },
  button2: {
    backgroundColor: 'white',
    color: 'green',
  },
  container: {
    // flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  header: {
    backgroundColor: '#00ced1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 10,
    paddingLeft: 10,
    elevation: 2,
    position: 'relative'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingBottom: 5
  }
};

export default Header;