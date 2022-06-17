import * as React from "react";
import { Pressable, View, StyleSheet, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

export default function MenuComponent(userInfo: any) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("Modal", { userInfo })}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Ionicons name="settings" size={24} style={[themeTextStyle]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 15,
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#d0d0c0",
  },
});
