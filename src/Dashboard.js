import {View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable, FlatList, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome } from '@expo/vector-icons'; 

const Dashboard = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos'); 
    const [addData, setAddData] = useState(''); 

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
        
    
        //delete a todo
        const deleteTodo = (todos) => {
            todoRef
                .doc(todos.id)
                .delete()
                .then(() => {
                    alert('Task deleted!')
                })
                .catch(error => {
                    alert(error)
                });
        }
    
        //add a todo
        const addTodo = () => {
            if (addData && addData.length > 0) {
                //get the timestamp
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                const data = {
                    heading: addData,
                    createdAt: timestamp,
                };
                todoRef
                    .add(data)
                    .then(() => {
                        setAddData('')
                        Keyboard.dismiss() //remove the keyboard
                    })
                    .catch((error) => {
                        alert(error)
                    });
            }
        }

    return(
        <View style={{flex: 1}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 20}}>
                Hello, {name.firstName}!
            </Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a task"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    //underlineColorAndroid='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate('Details', {item})}
                        >
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>{item.heading[0].toUpperCase() + item.heading.slice(1)}</Text>
                            </View>

                            <FontAwesome
                                name="trash-o"
                                color="red"
                                onPress={() => deleteTodo (item)}
                                style={styles.todoIcon}
                            />
                        </Pressable>
                    
                        

                    </View>
                )}
            />
        
            <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
                style={styles.btnLogOut}
            >
                <Text style={{color: 'red',}}>
                    Log Out
                </Text>
            </TouchableOpacity>
            


        </View>
    )
}

export default Dashboard 

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 0,
        justifyContent: "space-between",
    },
    button:{
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        height: 50, 
        borderRadius: 15,
        alignSelf:'right'
        // backgroundColor: '#f4511e',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 25,
        marginRight: 15,
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
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
    },
    itemHeading:{
        fontWeight: 'bold',
        fontSize: 18,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
    },


})