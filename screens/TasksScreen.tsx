import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Task } from "../types";

import { Text, View } from "../components/Themed";
import { getTasks } from "../api/database";

export default class TasksScreen extends Component<
  any,
  { tasks: Task[]; refreshing: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      tasks: [],
      refreshing: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  _onRefresh = () => {
    this.getData();
  };

  getData() {
    const frequency = this.props.frequency;

    this.setState({
      refreshing: true,
    });

    getTasks(frequency).then((tasks) => {
      let newState = [];
      for (let task in tasks) {
        newState.push({
          id: tasks[task].id,
          name: tasks[task].name,
          description: tasks[task].description,
          url: tasks[task].url,
          frequency: tasks[task].frequency,
        });
      }
      this.setState({
        tasks: newState,
        refreshing: false,
      });
    });
  }

  render() {
    const tasks = this.state.tasks;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          ></RefreshControl>
        }
      >
        <View style={styles.container}>
          {tasks.map((task: Task) => (
            <TouchableOpacity
              key={task.id}
              onPress={() => this.props.navigation.navigate("Edit", { task })}
            >
              <View style={[styles.tile]}>
                <Text style={styles.text}>{task.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Edit")}
          >
            <View style={[styles.tile, styles.tileComplete]}>
              <Text style={styles.text}>Finished Item</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const numOfTilesInRow = 1;
var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    height: screenHeight,
  },
  tile: {
    backgroundColor: "#C4C4C4",
    height: 80,
    margin: 5,
    width: screenWidth / numOfTilesInRow - 20, // subtract for padding & margins
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tileComplete: {
    backgroundColor: "#00A3FF",
  },
  text: {
    padding: 5,
    textAlign: "center",
  },
});
