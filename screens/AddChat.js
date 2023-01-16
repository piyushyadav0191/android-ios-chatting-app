import { View, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Input } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { db } from "../Firebase"
import { collection, addDoc } from "firebase/firestore";


const AddChat = () => {
    const [input, setInput] = useState('')
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        await addDoc(collection(db, "chats"), {
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Input placeholder='Enter a Chat name' value={input} onChangeText={(text) => setInput(text)} leftIcon={
                <FontAwesome name="wechat" size={24} color="black" />
            } onSubmitEditing={createChat} />
            <Button onPress={createChat} title="Create a New Chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
})