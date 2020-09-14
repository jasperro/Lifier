import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Overview from "../screens/Overview";
import Data from "../screens/Data";

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
            <TabBarIcon name="view-dashboard" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Data"
        component={DataNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="database" color={color} />
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
