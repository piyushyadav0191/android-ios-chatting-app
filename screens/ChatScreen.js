import { View, Text, TouchableOpacity, SafeAreaView, Platform, StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../Firebase"
import { serverTimestamp, addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const ChatScreen = ({ route }) => {
    const navigation = useNavigation();

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL || "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png",
                    }} />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName} </Text>
                </View>
            ),

            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss()
        addDoc(collection(db, 'chats', route.params.id, 'messages'), {
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput(' ')
    }

    useLayoutEffect(() => {
        const ref = query(collection(db, "chats", route.params.id, 'messages'), orderBy('timestamp', "asc"))
        onSnapshot(ref, (categories) =>
            setMessages(categories.docs.map((category) => ({
                id: category.id,
                data: category.data()
            })))
        )
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} position="absolute" bottom={-15} right={-5} style={styles.receiver}>
                                        <Avatar rounded size={30} source={{
                                            uri: data.photoURL
                                        }} />
                                        <Text style={styles.receiverText}> {data.message} </Text>
                                    </View>
                                )
                                    :
                                    (
                                        <View style={styles.sender}>
                                            <Avatar rounded position="absolute" bottom={-15} left={-5} size={30} source={{
                                                uri: data.photoURL
                                            }} />
                                            <Text style={styles.sendedText}> {data.message} </Text>
                                            <Text style={styles.senderName}> {data.displayName} </Text>
                                        </View>
                                    )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput placeholder='Geeks Message' style={styles.inputContainer} value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={sendMessage} />
                            <TouchableOpacity onPress={sendMessage}>
                                <FontAwesome name="send" size={24} color="#2b68e6" />
                            </TouchableOpacity >
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ececec",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2b68e6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    sendedText: {
        color: 'white',
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    receiverText: {
        color: 'black',
        fontWeight: "500",
        marginLeft: 10,
    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        padding: 15,
    },
    inputContainer: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ececec",
        padding: 10,
        color: "gray",
        borderRadius: 30,
    }
})