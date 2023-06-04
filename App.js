import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from "react";
import { firebase } from './config';

import Login from './src/Login';
import Dashboard from './src/Dashboard';
import Registration from './src/Registration';
import Header from "./components/Header";
import Update from "./src/Update";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{
            headerTitle: () => <Header name="React Native Authentication" />,
            headerStyle: {
              height: 100,

              backgroundColor: '#788eec',
              shadowColor: '#000',
              elevation: 25,
            }
          }}
        />

        <Stack.Screen name="Registration" component={Registration}
          options={{
            headerTitle: () => <Header name="Register Here" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#788eec',
              shadowColor: '#000',
              elevation: 25,
            }
          }}
        />
      </Stack.Navigator>

    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard}
        options={{
          headerTitle: () => <Header name="To-Do List" />,
          headerStyle: {
            height: 100,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: '#788eec',
            shadowColor: '#000',
            elevation: 25,
          },
          
        }}
      />

      <Stack.Screen name="Update" component={Update}
      options={{
        headerTitle: () => <Header name="Update Task" />,
        headerStyle: {
          height: 100,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: '#788eec',
          shadowColor: '#000',
          elevation: 25,
        },
        
      }}
    />
    </Stack.Navigator>

  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
