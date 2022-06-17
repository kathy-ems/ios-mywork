/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/MenuScreen";
import AcknowledgeScreen from "../screens/AcknowledgeScreen";
import LoginScreen from "../screens/LoginScreen";
import TasksScreen from "../screens/TasksScreen";
import Menu from "../components/MenuComponent";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import TaskScreen from "../screens/TaskScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Task"
        component={TaskScreen}
        options={({ route }) => ({ title: route.params?.task.name })}
      />
      <Stack.Group screenOptions={{ presentation: "modal", title: "Menu" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen
        name="Acknowledge"
        component={AcknowledgeScreen}
        options={({ route }) => ({
          title: `${route.params?.task.name}-Acknowledge`,
        })}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      initialRouteName="Daily"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabelStyle: { fontSize: 15 },
      }}
    >
      <BottomTab.Screen
        name="Daily"
        children={() => (
          <TasksScreen frequency="daily" navigation={navigation} />
        )}
        options={() => ({
          title: "Daily",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () => <Menu />,
        })}
      />
      <BottomTab.Screen
        name="Weekly"
        children={() => (
          <TasksScreen frequency="weekly" navigation={navigation} />
        )}
        options={() => ({
          title: "Weekly",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () => <Menu />,
        })}
      />
      <BottomTab.Screen
        name="Monthly"
        children={() => (
          <TasksScreen frequency="monthly" navigation={navigation} />
        )}
        options={{
          title: "Monthly",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () => <Menu />,
        }}
      />
      <BottomTab.Screen
        name="Resources"
        children={() => (
          <TasksScreen frequency="resources" navigation={navigation} />
        )}
        options={{
          title: "Resources",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="info-circle" color={color} />
          ),
          headerRight: () => <Menu />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}
