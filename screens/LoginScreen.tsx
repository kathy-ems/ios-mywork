import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import googleConfig from '../config/index';


const LoginScreen = () => {
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const navigation = useNavigation();

  // // TODO: Handle message gracefully
  // const handleMessage = (message: any, type = 'FAILED') => {
  //   setMessage(message);
  //   setMessageType(type);
  // }

  const handleGoogleSignin = async () => {
   await Google.logInAsync(googleConfig)
      .then((result) => {
        const {type, user} = result;
        if (type == 'success') {
          const {email, name, photoUrl} = user;
          setTimeout(() => {
            navigation.navigate('Root', {email, name, photoUrl}), 1
            // navigation.navigate('Root'), 1
          });
        } else {
          // TODO: Handle message gracefully
          // handleMessage('Google signin was canclled');
        }
        setGoogleSubmitting(false);
      })
      .catch((e) => {
        console.log(e);
        // handleMessage('An error orrcured. Check your network and try again');
        setGoogleSubmitting(false);
      });
  }
  
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior="padding"
    >
      <TouchableOpacity
        onPress={handleGoogleSignin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Google Sign-In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
})
