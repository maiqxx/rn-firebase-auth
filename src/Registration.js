
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {firebase} from '../config';

const Registration = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    
    registerUser = async(email, password, firstName, lastName, mobile, address) => {
        await firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://test-projects-73e32.firebaseapp.com',
            }).then(() => {
                alert('Please check your email inbox or spam for verification')
            }).catch((error) => {
                alert(error.message)
            }).then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                    mobile,
                    address,
                })
            }).catch((error) => {
                alert(error.message)
                })
            })
            .catch((error) => {
                alert(error.message);
            })
        }
        
        return(
 
            <View style={styles.container}>
                <View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="First Name"
                            onChangeText={(firstName) => setFirstName(firstName)}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Last Name"
                            onChangeText={(lastName) => setLastName(lastName)}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mobile No."
                        onChangeText={(mobile) => setMobile(mobile)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="phone-pad"
                    />
                    </View>

                    <View style={styles.inputWrapper}>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Address"
                    onChangeText={(address) => setAddress(address)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    />
                    </View>

                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                    </View>

                    <TouchableOpacity
                        onPress={() => registerUser(email, password, firstName, lastName, mobile, address)}
                        style={styles.button}
                    >
                        <Text style={{fontWeight:'bold', fontSize: 18}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
  

}

export default Registration 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
    },
    textInput:{
        width: 280,
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
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#788eec',
        alignSelf: 'center',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, 
        marginTop: 30,
        borderRadius: 50,
        // backgroundColor: '#f4511e',
    },
    errorTxt:{
        fontSize: 12,
        color:'#FF0D10',
    },
    inputWrapper:{
        marginBottom: 15,
    },

})