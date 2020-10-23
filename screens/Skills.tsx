import React, { useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import { Text, TextInput, FAB, Button, Surface } from 'react-native-paper'
import { View } from 'styled/Themed'
import { fonts } from 'root/fontconfig'

export function SkillCategoriesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('SkillCategory', {
                        itemId: 86,
                    })
                }}
            >
                Go to skill category
            </Button>
            <ScrollView></ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

const DefaultStackOptions = (path: Array<string> = []) => {
    return {
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

            const pathElements = []

            for (const [index, value] of path.entries()) {
                pathElements.push(
                    <Text style={styles.headertext}>{value}</Text>
                )
            }

            return (
                <Surface style={styles.headercontainer}>
                    {pathElements}
                    <Text style={styles.headertext}>{title}</Text>
                    {backbutton}
                </Surface>
            )
        },
    }
}

export function SkillCategoryScreen({ route, navigation }) {
    const { itemId } = route.params

    useEffect(() => {
        navigation.setOptions({
            headerTitle: JSON.stringify(itemId),
            ...DefaultStackOptions(['Skill Tree']),
        })
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Button
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('Skill', {
                            skillId: 291390321,
                        })
                    }}
                >
                    Go to skill
                </Button>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

export function SkillScreen({ route, navigation }) {
    const { skillId } = route.params
    useEffect(() => {
        navigation.setOptions({
            headerTitle: JSON.stringify(skillId),
            ...DefaultStackOptions(['Skill Tree', 'Skill Category']),
        })
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>skillId: {JSON.stringify(skillId)}</Text>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

// Opbouw
/*
<ContainerWithXPBar>

                //query alle skill categories, en maak voor elk element een <SkillCategoryCard>
                    //bij het klikken wordt er een nieuw scherm gemaakt in de stack navigator met een lijst van alle skills die erbij horen.

<FAB />
</ContainerWithXPBar>
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    headertext: {
        fontSize: 40,
        ...fonts.light,
    },
    headercontainer: {
        paddingBottom: 25,
        paddingTop: 30,
        paddingLeft: 30,
    },
})
