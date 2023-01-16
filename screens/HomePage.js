import { useNavigation } from '@react-navigation/native'
import { Avatar } from '@rneui/base'
import { useEffect, useLayoutEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import CustomListItems from '../components/CustomListItems'
import { auth, db } from "../Firebase";
import { signOut } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons';
import { collection, onSnapshot } from "firebase/firestore";


const HomePage = () => {

    const [chats, setChat] = useState([])

    const navigation = useNavigation()

    const LogOut = () => {
        signOut(auth).then(() => {
            navigation.replace('LoginScreen')
        }).catch((error) => {
            alert(error.message)
        });
    }

    useEffect(() => {
        const ref = collection(db, "chats");
        onSnapshot(ref, (categories) =>
            setChat(categories.docs.map((category) => ({
                id: category.id,
                data: category.data()
            })))
        )
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Let's Chat",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: 'black' },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={LogOut} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 10,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <FontAwesome name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <FontAwesome name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItems key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}


export default HomePage

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})