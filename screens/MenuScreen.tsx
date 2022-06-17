import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { Text, View } from "../components/Themed";
import { Avatar } from "react-native-elements";
import { userEmail, userName, userPhoto } from "../global";
import SelectDropdown from "react-native-select-dropdown";
import { getDataStore, storeData } from "../api/localStorage";
import { depts } from "../types";
import Constants from "expo-constants";

export default function ModalScreen() {
  const navigation = useNavigation();
  const [dept, setDept] = useState<any>(null);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login", {});
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    getDataStore("dept").then(setDept);
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.closeText}>Swipe down to close</Text>
      </View>
      <View style={styles.container}>
        <Avatar
          rounded
          source={{
            uri: userPhoto,
          }}
        />
        <Text style={styles.text}>Hello, {userName}</Text>
        <Text style={styles.text}>Logged in as {userEmail}</Text>
        <TouchableOpacity onPress={handleSignout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.closeText}>Department Setting:</Text>
        <SelectDropdown
          data={depts}
          defaultValue={dept ?? "ALL"}
          defaultButtonText={"Select department"}
          onSelect={(selectedItem) => {
            storeData("dept", selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.versionText}>
          MyWork version: {Constants.manifest?.version}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    fontSize: 15,
  },
  closeText: {
    position: "absolute",
    top: "15%",
    fontWeight: "600",
  },
  bottomContainer: {
    flex: 2,
    alignItems: "center",
  },
  versionText: {
    position: "absolute",
    bottom: "15%",
    textAlign: "center",
  },
  dropdown1BtnStyle: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "center" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "center" },
});
