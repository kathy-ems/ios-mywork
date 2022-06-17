import React from "react";
import { Button, Dimensions, Linking, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import DescriptionComponent from "../components/DescriptionComponent";
import styleSheet from "../constants/StyleSheet";

export default function TaskScreen(navigator: { route: { params: any } }) {
  const navigation = useNavigation();
  const task = navigator.route.params.task;

  return (
    <View style={styles.container}>
      <DescriptionComponent task={task} />
      <View style={styles.bottomContainer}>
        {task.url !== "" ? (
          <View style={styles.buttonContainer}>
            <View style={[styleSheet.outlineButton, styleSheet.blueShadow]}>
              <Button
                onPress={() => Linking.openURL(task.url)}
                title={
                  task.actionName && task.actionName !== ""
                    ? task.actionName
                    : "Open Work"
                }
                color="#00A3E0"
                accessibilityLabel="Open Work button"
              />
            </View>
          </View>
        ) : null}
        {task.acknowledgement ? (
          <View style={styles.buttonContainer}>
            <View style={[styleSheet.outlineButton, styleSheet.blueShadow]}>
              <Button
                onPress={() => navigation.navigate("Acknowledge", { task })}
                title="Acknowledge"
                color="#00A3E0"
                accessibilityLabel="Acknowledge button"
              />
            </View>
          </View>
        ) : (
          <View style={styles.spacerContainer} />
        )}
      </View>
    </View>
  );
}

var screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  bottomContainer: {
    paddingTop: 10,
    marginBottom:
      screenHeight < 750 ? screenHeight * 0.005 : screenHeight * 0.06,
    backgroundColor: "#FFFFFF",
  },
  spacerContainer: {
    paddingBottom: 35,
    backgroundColor: "#FFFFFF",
  },
});
