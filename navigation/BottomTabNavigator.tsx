import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";

import { StyleSheet } from "react-native";
import { fonts } from "root/fontconfig";

import Tasks from "../screens/Tasks";
import Settings from "../screens/Settings";
import Dashboard from "../screens/Dashboard";
import { SkillCategoryScreen } from "../screens/SkillCategoryScreen";
import { SkillCategoriesScreen } from "../screens/SkillCategoriesScreen";
import { SkillScreen } from "../screens/SkillScreen";

import DefaultStackOptions from "./DefaultStackOptions";

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Dashboard">
            <BottomTab.Screen
                name="Tasks"
                component={TasksNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="calendar-check" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Dashboard"
                component={DashboardNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="view-dashboard" color={color} />
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
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="cog" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }): JSX.Element {
    return <MaterialCommunityIcons size={26} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TasksStack = createStackNavigator();

function TasksNavigator() {
    return (
        <TasksStack.Navigator>
            <TasksStack.Screen
                name="Tasks"
                component={Tasks}
                options={{
                    headerTitle: "Tasks",
                    ...DefaultStackOptions(),
                }}
            />
        </TasksStack.Navigator>
    );
}

const DashboardStack = createStackNavigator();

function DashboardNavigator() {
    return (
        <DashboardStack.Navigator>
            <DashboardStack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerTitle: "Dashboard",
                    ...DefaultStackOptions(),
                }}
            />
        </DashboardStack.Navigator>
    );
}

const SkillsStack = createStackNavigator();

function SkillsNavigator() {
    return (
        <SkillsStack.Navigator>
            <SkillsStack.Screen
                name="SkillCategories"
                component={SkillCategoriesScreen}
                options={{
                    headerTitle: "Skill Tree",
                    ...DefaultStackOptions(),
                }}
            />
            <SkillsStack.Screen
                name="SkillCategory"
                component={SkillCategoryScreen}
                options={{
                    headerTitle: "Skill Category",
                    ...DefaultStackOptions(),
                }}
            />
            <SkillsStack.Screen
                name="Skill"
                component={SkillScreen}
                options={{
                    headerTitle: "Skill",
                    ...DefaultStackOptions(),
                }}
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
                options={{ headerTitle: "Settings", ...DefaultStackOptions() }}
            />
        </SettingsStack.Navigator>
    );
}

const styles = StyleSheet.create({
    headertext: {
        fontSize: 40,
        ...fonts.light,
    },
    headercontainer: {
        paddingBottom: 25,
        paddingTop: 30,
        paddingLeft: 10,
    },
});
