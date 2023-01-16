import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ChatIcon } from "../assets/index"
import { Input, Image } from '@rneui/themed';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../Firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        const unSubsribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                navigation.navigate('HomePage')
            }
        })
        return unSubsribe;
    }, [])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => alert(error.message));
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Image source={ChatIcon} style={{ width: 150, height: 150, paddingBottom: 4, marginBottom: 10 }} />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn} />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate('RegisterScreen')} type="outline" title="Register" />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})