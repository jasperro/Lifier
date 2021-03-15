import React, { useEffect, useState } from "react";
import { FAB, Button, Card, IconButton, useTheme } from "react-native-paper";
import { View as TransparentView } from "react-native";
import { View } from "styled/Themed";
import { FlatGrid } from "react-native-super-grid";
import databasePromise from "model/database";
import Color from "color";
import SkillCategorySchema from "root/model/skillcategory.type";
import { styles } from "./Skills";

export function SkillCategoriesScreen({ navigation }): JSX.Element {
    const { colors } = useTheme();
    const [list, setList] = useState([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const skillcategoryCollection = database.skillcategories;

            const query = skillcategoryCollection.find();
            query.$.subscribe((documents) => setList(documents));
        })();
    }, []);
    return (
        <View style={styles.container}>
            <FlatGrid
                itemDimension={330}
                spacing={10}
                style={styles.cardlist}
                data={list}
                keyExtractor={(item: SkillCategorySchema) =>
                    item.skill_category_id
                }
                renderItem={({ item }) => (
                    <Card
                        onPress={() => {
                            /* Navigate to skill route with params */
                            navigation.navigate("SkillCategory", {
                                categoryId: item.skill_category_id,
                                displayName: item.display_name,
                            });
                        }}
                        key={item.skill_category_id}
                        style={[
                            styles["card"],
                            { backgroundColor: item.color },
                        ]}
                    >
                        <Card.Title
                            titleStyle={{
                                fontSize: 50,
                                lineHeight: 100,
                                color: !item.color
                                    ? colors.text
                                    : Color(item.color).isDark
                                    ? colors.textLight
                                    : colors.textDark,
                            }}
                            title={item.display_name}
                        />

                        <TransparentView
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                            }}
                        >
                            <IconButton
                                icon="delete"
                                size={24}
                                color="white"
                                onPress={() => item.delete()}
                            />
                            <IconButton
                                icon="pencil"
                                size={24}
                                color="white"
                                onPress={() => {
                                    navigation.navigate("EditCategory", {
                                        categoryId: item.skill_category_id,
                                        displayName: item.display_name,
                                    });
                                }}
                            />
                        </TransparentView>
                    </Card>
                )}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate("NewCategory")}
            />
        </View>
    );
}
