import React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useNavigation } from '@react-navigation/native';
import DescriptionComponent from "../components/DescriptionComponent";

export default function AcknowledgeScreen(navigator: { route: { params: any } },
) {
  const navigation = useNavigation();  
  const task = navigator.route.params.task;

  return (
    <View style={styles.container}>
      <DescriptionComponent task={task} />
      <View style={styles.buttonContainer}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.acknowledgeText}>I acknowledge this task today</Text>
      </View>
       <View style={styles.outlineButton}>
        <Button
          onPress={() => navigation.navigate('Edit', {task})}
          title='Confirm'
          color='#00A3FF'
          accessibilityLabel='Confirm button'
          />
        </View>
      </View>
      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    flexDirection: 'column',
  },
  descriptionContainer: {
    flex: 3,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solidButton: {
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#00A3FF',
    width: 200,
  },
  outlineButton: {
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#00A3FF',
    borderWidth: 2,
    width: 200,
  },
  bottomSpacer: {
    flex: 2,
  },
  acknowledgeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
