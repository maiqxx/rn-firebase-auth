import {Alert, View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable, FlatList, Keyboard} from 'react-native';
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
        
        const handleDelete = () => {
            Alert.alert(
              'Delete Item',
              `Are you sure you want to delete this task?`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => deleteTodo(todos),
                  style: 'destructive',
                },
              ],
              { cancelable: false }
            );
          };
    
        //delete a todo
        const deleteTodo = (todos) => {
            const handleDelete = () => {
              todoRef
                .doc(todos.id)
                .delete()
                .then(() => {
                  Alert.alert('Task deleted!');
                })
                .catch((error) => {
                  Alert.alert(error.message);
                });
            };
          
            Alert.alert(
              'Delete Task',
              'Are you sure you want to delete this task?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: handleDelete,
                },
              ],
              { cancelable: false }
            );
          };
    
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
            <View style={styles.signedInContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 20}}>
                    Hello, {name.firstName}!
                </Text>

                <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
                style={styles.btnLogOut}
            >
                <Text style={{color: 'red',}}>
                    Log Out
                </Text>
            </TouchableOpacity>
            </View>
            
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
                            onPress={() => navigation.navigate('Update', {item})}
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
        alignSelf: 'center',  
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, 
        marginTop: 30,
        borderRadius: 50,
        marginRight: 15,
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
        marginTop: 10,
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
    signedInContainer: {   
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },


})