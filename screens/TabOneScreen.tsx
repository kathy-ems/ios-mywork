import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MonthlyStack = createNativeStackNavigator();

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <>
    <View style={styles.containerColumn}>
        <View style={styles.containerRow}>
          <View style={styles.listItemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('TabTwo')}>
              <Text style={styles.boxStyleText}>Switch to Weekly tab</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listItemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('TabOne')}>
              <Text style={styles.boxStyleText}>Switch to Daily tab</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listItemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
              <Text style={styles.boxStyleText}>Navigate from screen to screen in a hierarchical fashion</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.listItemContainer}>
            <Text style={styles.boxStyleText}>Item 4</Text>
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.boxStyleText}>Item 5</Text>
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.boxStyleText}>Item 6</Text>
          </View>
        </View>
      </View></>
  );
}

const styles = StyleSheet.create({
  containerColumn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    flexDirection: 'column',
    flexWrap:'wrap',
  },
  containerRow: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    flexDirection:'row', // inline-block
    flexWrap:'wrap',
  },
  listItemContainer: {
    marginHorizontal: 5,
    backgroundColor: 'tan',
    width: 125,
    height: 100,
    flex: .5, // this squishes the boxes if set to .3
  },
  boxStyleText: {
    padding: 5,
    textAlign: 'center',
  },
});
