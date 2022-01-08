import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { Text, View } from '../components/Themed';
import { Avatar } from 'react-native-elements';

export default function ModalScreen(props: any) {
  const navigation = useNavigation();
  const userName = props.route.params.userInfo.userName.name;
  const userEmail = props.route.params.userInfo.userName.email;
  const userPhoto = props.route.params.userInfo.userPhoto;

  const handleSignout = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace('Login');
    })
    .catch(e => alert(e.message))
  }

  return (
    <>
    <View style={styles.container}>
      <Avatar rounded source={userPhoto} />
      <Text style={styles.text}>Hello {userName}</Text>
      <Text style={styles.text}>Logged in as {userEmail}</Text>
      <TouchableOpacity
        onPress={handleSignout}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <Text style={styles.closeText}>Swipe down to close</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    fontSize: 15,
  },
  closeText: {
    flex: 1
  }
});
