import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Details = ({route}) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeText] = useState(route.params.item.name);
    const navigation = useNavigation();
    const [todos, setTodos] = useState('');

    const updateTodo = () => {
        if (textHeading && textHeading.length > 0){
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
            }).then (() => {
                navigation.navigate('Home')
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

        //fetch or read the data from firestore
        useEffect(() => {
            todoRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const todos = []
                    querySnapshot.forEach(doc => {   
                        const {heading} = doc.data()
                        todos.push({
                            id: doc.id,
                            heading,
                        })
                        
                    })
                    setTodos(todos)
                }    
            )
        }, [])


    return(
        <View style={StyleSheet.container}>
            <TextInput
                style={styles.textField}
                onChangeText={onChangeText}
                value={textHeading}
                placeholder="Edit task"
            />

            <Pressable
                style={styles.buttonUpdate}
                onPress={() => {updateTodo()}}
            >
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
        </View>
    )

}

export default Details;

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginTop: 150,
        marginBottom: 10,
        padding: 10,
        fontSize: 20,
        color: 'black',
        backgroundColor: 'lightgray',
        borderRadius: 5,
        width: 350,
        alignSelf: 'center',
    },
    buttonUpdate:{
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#788eec',
        width: 150,
        alignSelf: 'center',
    
    },
    buttonText:{
        fontSize: 18,
        color: '#fff'
    }
});