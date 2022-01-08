import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function DescriptionComponent({ task }: any,
) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>{task.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    flex: 3,
    padding: 10,
  },
  descriptionText: {
    fontSize: 15,
  },
});
