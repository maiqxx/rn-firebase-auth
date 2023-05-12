import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            } else {
                console.log('User does not exist!')
            }
        })
    }, [])

    return(
        <SafeAreaView style={StyleSheet.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Hello, {name.firstName}!
            </Text>


            <TouchableOpacity
                onPresss={() => navigation.navigate('ToDoList')}
                style={styles.button}
        >
            <Text style={{color: 'black', fontSize: 18, fontWeight: 600, }}>
                Go to My To-Do List
            </Text>
        </TouchableOpacity>

            <TouchableOpacity
                onPresss={() => {firebase.auth().signOut()}}
                style={styles.btnLogOut}
            >
                <Text style={{color: 'red',}}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
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

    btnLogOut:{
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, 
        marginTop: 30,
        borderRadius: 50,
        // backgroundColor: '#f4511e',
    }


})