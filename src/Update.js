import { View, Text, TextInput, StyleSheet, Pressable, Alert, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Update = ({route}) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeText] = useState(route.params.item.name);
    const navigation = useNavigation();
    const [createdAt, setCreatedAt] = useState('');

    const updateTodo = () => {
        if (textHeading && textHeading.length > 0){
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
            }).then (() => {
                Alert.alert('Task updated!');
                navigation.navigate('Dashboard')
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

    useEffect(() => {
        todoRef
          .doc(route.params.item.id)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              const { heading, createdAt } = snapshot.data();
              onChangeText(heading);
              setCreatedAt(createdAt.toDate());
            } else {
                Alert.alert('Todo does not exist!');
              console.log('Todo does not exist!');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

        //fetch or read the data from firestore
        // useEffect(() => {
        //     todoRef
        //     .orderBy('createdAt', 'desc')
        //     .onSnapshot(
        //         querySnapshot => {
        //             const todos = []
        //             querySnapshot.forEach(doc => {   
        //                 const {heading} = doc.data()
        //                 todos.push({
        //                     id: doc.id,
        //                     heading,
        //                 })
                        
        //             })
        //             setTodos(todos)
        //         }    
        //     )
        // }, [])


    return(
        <View style={StyleSheet.container}>
        
            <Image source={require('../assets/sticky-notes.png')} style={styles.img}/>

            <TextInput
                style={styles.textField}
                onChangeText={onChangeText}
                value={textHeading}
                multiline={true}
                numberOfLines={5}
                placeholder="Edit task"
            />

            <Text style={styles.createdAtText}>
                Created at: {createdAt.toString()}
            </Text>

            <Pressable
                style={styles.buttonUpdate}
                onPress={() => {updateTodo()}}
            >
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
        </View>
    )

}

export default Update;

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginTop: 40,
        marginBottom: 10,
        padding: 10,
        fontSize: 20,
        color: 'black',
        backgroundColor: 'lightgray',
        borderRadius: 5,
        width: 300,
        alignSelf: 'center',
        textAlignVertical: 'top',
    },
    buttonUpdate:{
        marginTop: 15,
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
    },
    createdAtText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'gray',
        alignSelf: 'center',
        multiline: true,
        width: 200,
        justifyContent: 'center',
        textAlign: 'center',
    },
    img: {
        marginTop: 40,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 10,
    }
});