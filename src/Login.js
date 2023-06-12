import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView} from 'react-native';
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
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Image source={require('../assets/log-in.png')} style={styles.loginImg}/>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>
                Log In
            </Text>

            <View style={{marginTop:20}}>
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

            <View style={styles.txtContainer}>
                <Text style={{fontSize:16, color: 'black', marginTop:20}}>
                    Don't have an account? 
                </Text> 

                <TouchableOpacity
                    onPress={() => navigation.navigate('Registration')}
                    style={{marginTop: 20}}
                >
                    <Text style={{fontSize:16, color: 'blue'}}>
                        Register Here
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInput:{
        width: 280,
        marginBottom: 10,
        borderColor: '#16213E',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    button:{
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#788eec',
        width: 200,
        marginTop: 20,
        borderRadius: 50,
        height: 50, 
        alignItems: 'center',    
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginImg:{
        width: 200,
        height: 200,
        marginTop: 20,
    },
    txtContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

})