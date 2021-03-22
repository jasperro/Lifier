import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, List, useTheme } from "react-native-paper";
import { SkillCategorySchema } from "root/model/skillcategory.type";
import PreferencesContext from "root/PreferencesContext";

function ChipExample({ onSelect }: { onSelect: (list) => void }): JSX.Element {
    const { isThemeDark } = React.useContext(PreferencesContext);
    const { colors } = useTheme();

    const [dataSource, setDataSource] = useState<SkillCategorySchema[]>([]);

    const [clicked, setClicked] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const skillcategoryCollection = database.skillcategories;

            const query = skillcategoryCollection.find();
            query.$.subscribe((documents: SkillCategorySchema[]) => {
                setDataSource(documents);
            });
        })();
    }, []);

    useEffect(() => {
        onSelect ? onSelect(clicked) : undefined;
    }, [clicked]);
    return (
        <View style={styles.container}>
            <List.Section>
                <List.Subheader>Category</List.Subheader>
                <ScrollView horizontal={true} style={styles.row}>
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
                </ScrollView>
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
