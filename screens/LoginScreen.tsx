import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Google from "expo-google-app-auth";
import { googleConfig } from "../config";
import global from "../global";
import firebase from "firebase/app";
import { View } from "../components/Themed";

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
        if (result.type == "success") {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            result.idToken,
            result.accessToken
          );
          firebase.auth().signInWithCredential(credential);

          const { email, name, photoUrl } = result.user;
          email && (global.userEmail = email);
          name && (global.userName = name);
          photoUrl && (global.userPhoto = photoUrl);
          setTimeout(() => {
            navigation.navigate("Root", {}), 1;
          });
          return result.accessToken;
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
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoButtonContain}>
        <Text style={styles.appNametext}>MyWork for SSFP Leaders</Text>
        <Image
          style={styles.logo}
          source={require("../assets/images/icon.png")}
        />
        <Text style={[styles.text]}>
          Only @gene.com email addresses allowed
        </Text>
        <TouchableOpacity onPress={handleGoogleSignin} style={styles.button}>
          <Text style={styles.buttonText}>Google Sign-In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoButtonContain: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#003087",
  },
  appNametext: {
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
    width: 250,
    padding: 20,
    color: "#FFFFFF",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    width: 250,
    padding: 20,
    color: "#FFFFFF",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "stretch",
    borderRadius: 30,
  },
});
