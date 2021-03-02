import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Chip, List, useTheme } from "react-native-paper";
import PreferencesContext from "root/PreferencesContext";
import databasePromise from "model/database";
import { SkillCategoryType } from "root/model/skillcategory.schema";

function ChipExample(): JSX.Element {
    const { isThemeDark } = React.useContext(PreferencesContext);
    const { colors } = useTheme();

    const [dataSource, setDataSource] = useState<SkillCategoryType[]>([]);

    const [clicked, setClicked] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const skillcategoryCollection = database.skillcategories;

            const query = skillcategoryCollection.find();
            query.$.subscribe((documents: SkillCategoryType[]) =>
                setDataSource(documents)
            );
        })();
    }, []);
    return (
        <View style={[styles.container]}>
            <List.Section>
                <List.Subheader>Category</List.Subheader>
                <View style={styles.row}>
                    {dataSource.map((value, key) => {
                        return (
                            <Chip
                                key={key}
                                mode="outlined"
                                textStyle={{
                                    color:
                                        !isThemeDark &&
                                        !clicked.includes(
                                            value.skill_category_id
                                        )
                                            ? "black"
                                            : "white",
                                    fontSize: 15,
                                }}
                                style={{
                                    backgroundColor: clicked.includes(
                                        value.skill_category_id
                                    )
                                        ? value.color
                                        : colors.surface,
                                    margin: 5,
                                    flexWrap: "wrap",
                                }}
                                onPress={() => {
                                    const index = clicked.indexOf(
                                        value.skill_category_id
                                    );
                                    if (index <= -1) {
                                        // Voeg item toe aan geselecteerde elementen
                                        setClicked([
                                            ...clicked,
                                            value.skill_category_id,
                                        ]);
                                    } else {
                                        // Haal item uit de geselecteerde elementen
                                        setClicked([
                                            ...clicked.slice(0, index),
                                            ...clicked.slice(index + 1),
                                        ]);
                                    }
                                }}
                            >
                                {value.display_name}
                            </Chip>
                        );
                    })}
                </View>
            </List.Section>
        </View>
    );
}

ChipExample.title = "Chip";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 12,
    },
    chip: {
        margin: 4,
    },
});

export default ChipExample;
