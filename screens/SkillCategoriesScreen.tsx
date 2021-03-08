import React, { useEffect, useState } from "react";
import {
    FAB,
    Button,
    Card,
    useTheme
} from "react-native-paper";
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
                keyExtractor={(item: SkillCategorySchema) => item.skill_category_id}
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
                            title={item.display_name} />
                        <Button
                            onPress={async () => {
                                const database = await databasePromise;
                                const categoryCollection = database.skillcategories;
                                const query = categoryCollection.findOne(
                                    item.skill_category_id
                                );
                                const result = await query.exec();
                                await result.update({
                                    $set: {
                                        display_name: Math.random().toString(),
                                    },
                                });
                            }}
                        >
                            Rename to random name
                        </Button>
                    </Card>
                )} />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate("NewCategory")} />
        </View>
    );
}
