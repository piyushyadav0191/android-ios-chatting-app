import { View, KeyboardAvoidingView, StatusBar, StyleSheet } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { Input, Text, Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Firebase';

const RegisterScreen = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setimageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42STwjfKg1x3AmsXTwpXHV6DmN-ZfGoJp1A&usqp=CAU'
                })
            })
            .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>Create your Account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder='Full Name' autofocus type="text" value={name} onChangeText={(text) => setName(text)} />
                <Input placeholder='Email' type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='password' type="password" value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder='Profile picture URL (optional)' type="text" value={imageUrl} onChangeText={(text) => setimageUrl(text)} onSubmitEditing={register} />
            </View>
            <Button title='Register' onPress={register} raised containerStyle={styles.button} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})