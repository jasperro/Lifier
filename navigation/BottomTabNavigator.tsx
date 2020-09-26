import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Overview from "../screens/Overview";
import Settings from "../screens/Settings";
import Data from "../screens/Data";
import Skills from "../screens/Skills";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Overview"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Overview"
        component={OverviewNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-check" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Skills"
        component={SkillsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="file-tree" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Data"
        component={DataNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="finance" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const OverviewStack = createStackNavigator();

function OverviewNavigator() {
  return (
    <OverviewStack.Navigator>
      <OverviewStack.Screen
        name="Overview"
        component={Overview}
        options={{ headerTitle: "Overview" }}
      />
    </OverviewStack.Navigator>
  );
}

const SkillsStack = createStackNavigator();

function SkillsNavigator() {
  return (
    <SkillsStack.Navigator>
      <SkillsStack.Screen
        name="Skills"
        component={Skills}
        options={{ headerTitle: "Skills" }}
      />
    </SkillsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: "Settings" }}
      />
    </SettingsStack.Navigator>
  );
}

const DataStack = createStackNavigator();

function DataNavigator() {
  return (
    <DataStack.Navigator>
      <DataStack.Screen
        name="Stats"
        component={Data}
        options={{
          headerTitle: "Stats",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
      />
      <DataStack.Screen
        name="Points"
        component={Data}
        options={{
          headerTitle: "Points",
          headerStyle: {
            backgroundColor: "#ff4455",
          },
        }}
      />
    </DataStack.Navigator>
  );
}
