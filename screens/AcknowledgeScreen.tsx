import React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import DescriptionComponent from "../components/DescriptionComponent";
import styleSheet from "../constants/StyleSheet";
import { createTransaction } from "../api/database";

export default function AcknowledgeScreen(navigator: {
  route: { params: any };
}) {
  const navigation = useNavigation();
  const task = navigator.route.params.task;

  return (
    <View style={styles.container}>
      <DescriptionComponent task={task} />
      <View style={styles.bottomContainer}>
        <View style={styles.acknowledgeTextContainer}>
          <Text style={styles.acknowledgeText}>
            I acknowledge this task today
          </Text>
        </View>
        <View style={[styleSheet.outlineButton, styleSheet.blueShadow]}>
          <Button
            onPress={() => {
              createTransaction(task.id).then(() => {
                navigation.navigate("Root", {});
              });
            }}
            title="Confirm"
            color="#00A3E0"
            accessibilityLabel="Confirm button"
          />
        </View>
      </View>
    </View>
  );
}
var screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  acknowledgeTextContainer: {
    paddingBottom: 13,
    backgroundColor: "#FFFFFF",
  },
  bottomContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    marginBottom:
      screenHeight < 750 ? screenHeight * 0.005 : screenHeight * 0.06,
  },
  bottomSpacer: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
  },
  acknowledgeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
});
