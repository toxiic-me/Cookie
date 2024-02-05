import React, { useState } from 'react'
import { Text, View, ImageBackground, TextInput, Button, TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import Toast from 'react-native-toast-message'
import loginStyles from './loginStyles'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from "react-native-vector-icons/Feather";


const Login = ({ navigation }) => {
  const [showLoginLoader, setShowLoginLoader] = useState(false);
  const [showPass, setShowPass] = useState(false)

  const toast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      text1Style: { color: 'green' }
    });
  }
  const handleLogin = () => {
    setShowLoginLoader(true)
    setTimeout(() => {
      toast('success', 'Login Successfull')
      setShowLoginLoader(false)
    }, 2000);
  }
  return (
    <View style={loginStyles.main}>
      <ImageBackground source={require('../../../../assets/images/cookie.jpg')} resizeMode='cover' style={loginStyles.backgroundImg}>
        <View style={loginStyles.formWraper}>

          <View style={loginStyles.headWrapper}>
            <Image source={require('../../../../assets/images/cookie-Logo.png')} style={loginStyles.image} />
            <Text style={loginStyles.headText}>Cookie Login</Text>
            <Image source={require('../../../../assets/images/cookie-Logo.png')} style={loginStyles.image} />
          </View>

          <View style={loginStyles.inputWrapper}>
            <View style={loginStyles.iconWrapper}>
              <Fontisto name="email" size={20} color="#0e388e" />
            </View>
            <TextInput
              style={loginStyles.textInput}
              placeholder='email@xyz.com'
              placeholderTextColor='grey'
              cursorColor='orange' />
          </View>

          <View style={loginStyles.inputWrapper}>
            <View style={loginStyles.iconWrapper}>
              <Octicons name="key" size={20} color="#0e388e" />
            </View>
            <TextInput
              style={loginStyles.textInput}
              placeholder='**password**'
              placeholderTextColor='grey'
              cursorColor='orange'
              secureTextEntry={!showPass}
            />
            <TouchableOpacity style={loginStyles.eyeTool} onPress={() => setShowPass(prev => !prev)}>
              {
                !showPass ?
                  <Feather name="eye-off" size={20} color="#0e388e" /> :
                  <Feather name="eye" size={20} color="#0e388e" />
              }
            </TouchableOpacity>
          </View>


          <View style={loginStyles.extraLinkWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={loginStyles.extraLink}>New to Cookie?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={loginStyles.extraLink}>Forget Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={loginStyles.loginBtn} onPress={handleLogin}>
            {
              showLoginLoader ?
                <ActivityIndicator color='white' size='small' /> :
                <Text style={{ fontSize: 20, color: 'white' }}>Eat it!</Text>
            }
          </TouchableOpacity>
        </View>
        <Toast />
      </ImageBackground>
    </View>)
}

export default Login