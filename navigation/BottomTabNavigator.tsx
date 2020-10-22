import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createMaterialBottomTabNavigator as createBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack'

import * as React from 'react'

import { Text, Button } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { View } from 'styled/Themed'
import { fonts } from 'root/fontconfig'

import Overview from '../screens/Overview'
import Settings from '../screens/Settings'
import Data from '../screens/Data'
import {
    SkillCategoriesScreen,
    SkillCategoryScreen,
    SkillScreen,
} from '../screens/Skills'

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Overview"
            tabBarOptions={{
                animationEnabled: true,
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
    )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <MaterialCommunityIcons size={26} {...props} />
}

const DefaultStackOptions = {
    header: ({ scene, previous, navigation }) => {
        const { options } = scene.descriptor
        const title =
            options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : scene.route.name

        const backbutton = previous ? (
            <Button onPress={navigation.goBack}>Back</Button>
        ) : undefined

        return (
            <View style={styles.headercontainer}>
                <Text style={styles.headertext}>{title}</Text>
                {backbutton}
            </View>
        )
    },
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const OverviewStack = createStackNavigator()

function OverviewNavigator() {
    return (
        <OverviewStack.Navigator>
            <OverviewStack.Screen
                name="Overview"
                component={Overview}
                options={{ headerTitle: 'Overview', ...DefaultStackOptions }}
            />
        </OverviewStack.Navigator>
    )
}

const SkillsStack = createStackNavigator()

function SkillsNavigator() {
    return (
        <SkillsStack.Navigator>
            <SkillsStack.Screen
                name="SkillCategories"
                component={SkillCategoriesScreen}
                options={{
                    headerTitle: 'Skill Tree',
                    ...DefaultStackOptions,
                }}
            />
            <SkillsStack.Screen
                name="SkillCategory"
                component={SkillCategoryScreen}
                options={{
                    headerTitle: 'Skill Category',
                    ...DefaultStackOptions,
                }}
            />
            <SkillsStack.Screen
                name="Skill"
                component={SkillScreen}
                options={{
                    headerTitle: 'Skill',
                    ...DefaultStackOptions,
                }}
            />
        </SkillsStack.Navigator>
    )
}

const SettingsStack = createStackNavigator()

function SettingsNavigator() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={Settings}
                options={{ headerTitle: 'Settings', ...DefaultStackOptions }}
            />
        </SettingsStack.Navigator>
    )
}

const DataStack = createStackNavigator()

function DataNavigator() {
    return (
        <DataStack.Navigator>
            <DataStack.Screen
                name="Stats"
                component={Data}
                options={{
                    headerTitle: 'Stats',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    ...DefaultStackOptions,
                }}
            />
            <DataStack.Screen
                name="Points"
                component={Data}
                options={{
                    headerTitle: 'Points',
                    headerStyle: {
                        backgroundColor: '#ff4455',
                    },
                    ...DefaultStackOptions,
                }}
            />
        </DataStack.Navigator>
    )
}

const styles = StyleSheet.create({
    headertext: {
        fontSize: 40,
        ...fonts.light,
    },
    headercontainer: {
        paddingBottom: 40,
        paddingTop: 60,
        paddingLeft: 40,
    },
})
