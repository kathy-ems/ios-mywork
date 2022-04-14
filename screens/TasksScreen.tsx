import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { map, groupBy, maxBy, filter, includes } from "lodash";
import { hashLeftOuterJoin } from "lodash-joins";
import { Task, Record, Depts } from "../types";

import { Text, View } from "../components/Themed";
import { getTasks, getTransactions } from "../api/database";
import { getDataStore } from "../api/localStorage";

export default class TasksScreen extends React.Component<
  any,
  {
    tasks: Task[];
    records: Record[];
    refreshing: boolean;
    depts: Depts[];
    dept: string;
  }
> {
  unsubscribe: any;
  constructor(props: any) {
    super(props);
    this.state = {
      tasks: [],
      records: [],
      refreshing: true,
      depts: [],
      dept: "",
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.getData();
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getData();
    });
  }

  _onRefresh = () => {
    this.getData();
  };

  getData() {
    const frequency = this.props.frequency;

    this.setState({
      refreshing: true,
    });

    getDataStore("dept").then((d) => {
      this.setState({
        dept: d ?? "ALL",
      });
    });

    getTasks(frequency)
      .then((tasks) => {
        let newState = [];
        for (let task in tasks) {
          newState.push({
            id: tasks[task].id,
            name: tasks[task].name,
            description: tasks[task].description,
            url: tasks[task].url,
            frequency: tasks[task].frequency,
            acknowledgement: tasks[task].acknowledgement,
            actionName: tasks[task].actionName,
            depts: tasks[task].depts,
          });
        }

        this.setState({
          tasks: newState,
        });
      })
      .then(() => {
        getTransactions(frequency).then((records) => {
          let newState = [];
          for (let record in records) {
            newState.push({
              id: records[record].id,
              userEmail: records[record].userEmail,
              taskId: records[record].taskId,
              date: records[record].date,
            });
          }

          this.setState({
            records: newState,
          });
        });
      })
      .then(() => {
        this.setState({
          refreshing: false,
        });
      });
  }

  render() {
    const dept = this.state.dept;
    const tasks = filter(this.state.tasks, (o) => includes(o.depts, dept));
    const records = this.state.records;

    const latestRecords = map(groupBy(records, "taskId"), (record) =>
      maxBy(record, "date")
    );

    var accessor = function (obj: any) {
      var key = obj && obj["taskId"] ? "taskId" : "id";
      return obj[key];
    };

    var mergedTasks = hashLeftOuterJoin(
      tasks,
      accessor,
      latestRecords,
      accessor
    );

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            ></RefreshControl>
          }
        >
          <View style={styles.container}>
            <Text style={[styles.text, styles.gmpMessage]}>
              This does not supersede any GMP document or process, such as the
              GSP009 escalation process.
            </Text>
            {mergedTasks.map((task: any) => (
              <TouchableOpacity
                key={task.name}
                onPress={() => this.props.navigation.navigate("Task", { task })}
              >
                <View
                  style={
                    task.date
                      ? [styles.tile, styles.tileComplete, styles.shadow]
                      : [styles.tile, styles.shadow]
                  }
                >
                  <Text style={task.date ? styles.textComplete : styles.text}>
                    {task.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const numOfTilesInRow = 1;
var screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  container: {
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginRight: 2,
    backgroundColor: "#FFFFFF",
  },
  tile: {
    backgroundColor: "#9EA2A2",
    height: 80,
    margin: 5,
    width: screenWidth / numOfTilesInRow - 20, // subtract for padding & margins
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#9EA2A2",
  },
  shadow: {
    borderWidth: 1,
    shadowColor: "#000000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 3,
    },
  },
  tileComplete: {
    backgroundColor: "#00A3E0",
    borderColor: "#00A3E0",
  },
  textComplete: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 18,
  },
  text: {
    padding: 5,
    textAlign: "center",
    fontWeight: "400",
    color: "#000000",
    fontSize: 18,
  },
  gmpMessage: {
    color: "#D60C0C",
    padding: 15,
    fontStyle: "italic",
    fontSize: 14,
  },
});
