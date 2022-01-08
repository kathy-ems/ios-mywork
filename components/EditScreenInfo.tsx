import React from "react";
import { Button, StyleSheet } from "react-native";
import { View } from "./Themed";
import { useNavigation } from '@react-navigation/native';
import DescriptionComponent from "./DescriptionComponent";

const onPressOpenWork = () => {
  // TODO: open URL or iPhone app
}

export default function EditScreenInfo(navigator: { route: { params: any } },
) {
  const navigation = useNavigation();
  const task = navigator.route.params.task;

  return (
    <View style={styles.container}>
      <DescriptionComponent task={task} />
      <View style={styles.buttonContainer}>
        <View style={styles.outlineButton}>
          <Button
            onPress={onPressOpenWork}
            title='Open Work'
            color='#00A3FF'
            accessibilityLabel='Open Work button'
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
       <View style={styles.outlineButton}>
        <Button
          onPress={() =>
            navigation.navigate('Acknowledge', { task })
        }
          title='Acknowledge'
          color='#00A3FF'
          accessibilityLabel='Acknowledge button'
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
  }
});
