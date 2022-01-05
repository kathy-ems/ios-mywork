import * as React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'; 

export default function MenuOption(userInfo: any) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Modal', { userInfo })}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
          <Ionicons name="ios-menu-sharp" size={24} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 15,
  }
})
