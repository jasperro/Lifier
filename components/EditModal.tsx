import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Button } from "react-native-paper";
import { RxDocument } from "rxdb";

interface EditModal {
    type: string;
    currentName: string;
    document: RxDocument;
}

export default function EditModal({
    type,
    currentName,
    document,
}: EditModal): JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Modal
            animationType={"slide"}
            onRequestClose={() => setModalVisible(false)}
            visible={modalVisible}
        >
            <View>
                <Button onPress={() => setModalVisible(false)}>
                    Close Modal
                </Button>
            </View>
        </Modal>
    );
}

// <Button onPress={() => setModalVisible(true)}>Open Modal</Button>
