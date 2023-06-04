//Registration

import {Alert, View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {firebase} from '../config';
import { useNavigation } from '@react-navigation/native';


const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(
        /^[a-zA-Z ]+$/,
        'Only alphabets are allowed for this field.'
      )
      .required('Please enter your first name'),
    lastName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(
        /^[a-zA-Z ]+$/,
        'Only alphabets are allowed for this field.'
      )
      .required('Please enter your last name'),
    address: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(
        /^[a-zA-Z ]+$/,
        'Only alphabets are allowed for this field.'
      )
      .required('Please enter your address'),
    mobile: Yup.string()
      .min(11, 'Must be 11 digits')
      .max(11, 'Must be 11 digits')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Please enter your mobile number'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email address')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Invalid email address!'
        ),
    password: Yup.string()
        .min(8)
        .required('Please enter your password')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
    confirmPassword: Yup.string()
        .min(8, 'Confirm password must be at least 8 characters long')
        .oneOf([Yup.ref('password')], 'Your password does not match.')
        .required('Please confirm your password'),
    
  });

const Registration = () => {
    const navigation = useNavigation();

    //can remove these unused hooks to clean up the code
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const resetFormFields = () => {
        setFirstName('');
        setLastName('');
        setAddress('');
        setMobile('');
        setEmail('');
        setPassword('');
      };

    registerUser = async (email, password, firstName, lastName, address, mobile) => {
        const userRef = firebase.firestore().collection('users');
      
        // Check if user already exists
        const userSnapshot = await userRef.where('email', '==', email).get();
        if (!userSnapshot.empty) {
          Alert.alert('User is already registered!');
            // Clear the form fields
            resetFormFields();
          return;
        }
      
        try {
          await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
          await firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://test-projects-73e32.firebaseapp.com',
          });
      
          await userRef.doc(firebase.auth().currentUser.uid).set({
            firstName,
            lastName,
            email,
            mobile,
            address,
          });
      
          Alert.alert('Registration successful! Please check your email inbox or spam for verification');
        } catch (error) {
          Alert.alert(error.message);
          console.log('Registration error: ', error);
        }
      };
      
    
    // registerUser = async(email, password, firstName, lastName, address, mobile) => {
    //     await firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
    //     .then(() => {
    //         firebase.auth().currentUser.sendEmailVerification({
    //             handleCodeInApp: true,
    //             url:'https://test-projects-73e32.firebaseapp.com',
    //         }).then(() => {
    //             Alert.alert('Please check your email inbox or spam for verification')
    //         }).catch((error) => {
    //             Alert.alert(error.message)
    //             console.log("First catch " + error.message)
    //         }).then(() => {
    //             firebase.firestore().collection('users')
    //             .doc(firebase.auth().currentUser.uid)
    //             .set({
    //                 firstName,
    //                 lastName,
    //                 email,
    //                 mobile,
    //                 address,
    //             })
    //         }).catch((error) => {
    //             Alert.alert(error.message)
    //             console.log("Second catch " + error.message)
    //             })
    //         })
    //         .catch((error) => {
    //             Alert.alert(error.message);
    //             console.log("Third catch " + error.message)
    //         })
    //     }



        
        
        return(
            <Formik initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                address: '',
                password: '',
            }}
            validationSchema={SignupSchema}
            >
            {({
                values, 
                errors, 
                touched, 
                handleChange, 
                setFieldTouched, 
                isValid,
                handleSubmit,  
            }) =>(
            <View style={styles.container}>
                <View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="First Name"
                            value={values.firstName}
                            onChangeText={handleChange('firstName')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={() => setFieldTouched('firstName')}
                        />
                        {touched.firstName && errors.firstName && (
                            <Text style={styles.errorTxt}>{errors.firstName}</Text>
                        )}
                    </View>

                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Last Name"
                            value={values.lastName}
                            onChangeText={handleChange('lastName')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={() => setFieldTouched('lastName')}
                        />
                        {touched.lastName && errors.lastName && (
                            <Text style={styles.errorTxt}>{errors.lastName}</Text>
                        )}
                    </View>
                
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            onBlur={() => setFieldTouched('email')}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.errorTxt}>{errors.email}</Text>
                        )}
                    </View>

                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mobile No."
                        value={values.mobile}
                        onChangeText={handleChange('mobile')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="phone-pad"
                        onBlur={() => setFieldTouched('mobile')}
                    />
                        {touched.mobile && errors.mobile && (
                            <Text style={styles.errorTxt}>{errors.mobile}</Text>
                        )}
                    </View>

                    <View style={styles.inputWrapper}>
                        <TextInput
                        style={styles.textInput}
                        placeholder="Address"
                        value={values.address}
                        onChangeText={handleChange('address')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onBlur={() => setFieldTouched('address')}
                        />
                        {touched.address && errors.address && (
                            <Text style={styles.errorTxt}>{errors.address}</Text>
                        )}
                    </View>

                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onBlur={() => setFieldTouched('password')}
                    />
                    {touched.password && errors.password && (
                        <Text style={styles.errorTxt}>{errors.password}</Text>
                    )}
                    </View>

                    <TouchableOpacity
                        onPress={() => registerUser(
                            values.email,
                            values.password,
                            values.firstName,
                            values.lastName,
                            values.address,
                            values.mobile
                        )}
                        style={styles.button}
                    >
                        <Text style={{fontWeight:'bold', fontSize: 18, color:'#fff'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.txtContainer}>
                <Text style={{fontSize:16, color: 'black', marginTop:20}}>
                    Already have an account? 
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{marginTop: 20}}
                >
                    <Text style={{fontSize:16, color: 'blue'}}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>

            </View>
            )}
            </Formik>
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
    txtContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

})