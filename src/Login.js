import {View, Text, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    loginuser = async (email, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password);
            //navigation.navigate('Dashboard');
        } catch (error){
            alert(error.message);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>
                Log In
            </Text>

            <View style={{marginTop:40}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => loginuser(email, password)}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop: 20}}
            >
                <Text style={{fontSize:16, color: 'blue'}}>
                    Don't have an account? Register Here
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default Login 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    textInput:{
        width: 280,
        marginBottom: 10,
        borderColor: '#16213E',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        // paddingTop: 20,
        // paddingBottom: 10,
        // textAlign: 'center',
        // fontSize: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#000',
    },
    button:{
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#788eec',
        width: 200,
        marginTop: 40,
        borderRadius: 50,
        height: 50, 
        // backgroundColor: '#f4511e',
        alignItems: 'center',    
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

})