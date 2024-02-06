import React, { useState } from 'react'
import Config from 'react-native-config';
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'
import loginStyles from './loginStyles'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from "react-native-vector-icons/Feather";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showBtnLoader, setshowBtnLoader] = useState(false);
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const toast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      text1Style: {
        color: type === 'success' ? 'green' : 'red'
      }
    });
  }
  const handleLogin = async () => {
    const { email, password } = formData;
    setshowBtnLoader(true)
    // Validation checks
    if (!email || !password) {
      toast('error', 'All fields must be filled.');
      setshowBtnLoader(false)

      return;
    }

    try {
      let response = await fetch(`${Config.BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      let result = await response.json()

      if (result.message === 'Login successfull') {
        toast('success', result.message)
        setshowBtnLoader(false)
        await AsyncStorage.setItem('token', result.token)
        setTimeout(() => {
          dispatch({
            type: 'loginUser'
          })
        }, 1500);
      } else {
        toast('error', result?.message || result?.error)
        setshowBtnLoader(false)
      }

    } catch (error) {
      console.log(error);
      toast('error', 'Unexpected Error :(')
      setshowBtnLoader(false)
    }
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
              cursorColor='orange'
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev, email: text
                }))
              }} />
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
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev, password: text
                }))
              }} />

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
              showBtnLoader ?
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