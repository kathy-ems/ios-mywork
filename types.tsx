/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const depts = ["ALL", "MFG", "FE", "MSAT"] as string[];
export type Depts = typeof depts[number];

export type Task = {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  frequency: string;
  acknowledgement: boolean;
  actionName: string;
  depts: Depts;
};

export type Record = {
  id: string;
  userEmail: string;
  taskId: string;
  date: string;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | {};
  Modal: {};
  NotFound: {};
  Login: {};
  Task: { task: Task };
  Acknowledge: { task: Task };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Weekly: {};
  Daily: {};
  Monthly: {};
  Resources: {};
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
