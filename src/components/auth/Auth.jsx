import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Signup from './signup/Signup'
import Login from './login/Login'
import Forget from './forget/Forget';

const Stack = createStackNavigator();

export default Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: () => <></>,
            headerLeft: () => {
              return (<TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name='keyboard-backspace'
                  color='#0e388e' size={60} />
              </TouchableOpacity>)
            },
            headerStyle: {
              backgroundColor: 'black'
            }
          })} />
        <Stack.Screen
          name='Forget'
          component={Forget}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: () => <></>,
            headerLeft: () => {
              return (<TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name='keyboard-backspace'
                  color='#0e388e' size={60} />
              </TouchableOpacity>)
            },
            headerStyle: {
              backgroundColor: 'black'
            }
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}