// require('dotenv').Config() 
import React, { useEffect, useState } from 'react'
import Config from 'react-native-config'
import {
  View, ActivityIndicator, ImageBackground, Text
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Auth from './components/auth/Auth'
import Home from './components/Home'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isUserLoggedIn, token } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const autoLogin = async () => {
    setIsLoading(true)
    let token = await AsyncStorage.getItem('token')
    console.log('token: ', token);
    dispatch({
      type: 'addToken',
      payload: token
    })
    try {
      let response = await fetch(`${Config.BASE_URL}/getUserInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      let result = await response.json();
      console.log(result);
      if (result.message === 'Forbidden' || result.message === 'Unauthorized' || result.error === 'Server Internal Error') {
        dispatch({
          type: 'logoutUser'
        })
        setIsLoading(false)
      } else {
        dispatch({
          type: 'updateUserData',
          payload: { ...result }
        })
        dispatch({
          type: 'loginUser'
        })
        setIsLoading(false)

      }

    } catch (error) {
      setIsLoading(false)

    }
  }

  useEffect(() => {
    autoLogin()
  }, [])

  return (<>
    {
      isLoading ? <LoadingScreen /> :
        isUserLoggedIn ? <Home /> : <Auth />
    }
  </>)
}

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, }}>
      <ImageBackground source={require('../assets/images/cookie.jpg')} resizeMode='cover' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'medium'} color={'orange'} />
        <Text style={{ color: 'orange' }}>Eating cookie...</Text>
      </ImageBackground>
    </View>
  )
}

export default App
