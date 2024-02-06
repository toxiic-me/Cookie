import React, { useState } from 'react'
import Config from 'react-native-config'
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import signupStyles from './signupStyles'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

export default Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showBtnLoader, setshowBtnLoader] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [otp, setOtp] = useState(Math.floor(Math.random() * 100000000).toString().slice(0, 5))
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    code: ''
  });

  const toast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      text1Style: { color: type === 'success' ? 'green' : 'red' }
    });
  }


  const doesUserExist = async (email, username) => {
    try {
      let response = await fetch(`${Config.BASE_URL}/doesUserExist`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username })
      })
      let { message } = await response.json()
      if (message === 'User is unique') {
        sendCode(email, otp)
      } else {
        toast('error', message)
        setshowBtnLoader(false)
      }
    } catch (error) {
      toast('error', 'Internal Server Error')
    }
  }

  const sendCode = async (email, otp) => {
    try {
      let response = await fetch(`${Config.BASE_URL}/sendOtp`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      })
      let { message } = await response.json();
      toast('success', message)
      setshowBtnLoader(false)
      setIsCodeSent(true)
    } catch (error) {
      toast('error', 'Server Internal Error')
    }
  }

  const handleSignup = async () => {
    const { email, username, password, code } = formData;
    setshowBtnLoader(true)
    if (code === otp) {
      let user = { email, password, username };
      let response = await fetch(`${Config.BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      let result = await response.json();
      toast('success', result.message);
      setshowBtnLoader(false)
      await AsyncStorage.setItem('token', result.token)
      dispatch({
        type: "addToken",
        token: result.token
      })
      dispatch({
        type: "loginUser",
      })
      setTimeout(() => {
        navigation.navigate('Login')
      }, 2000)
    } else {
      toast('error', 'Invalid verification code')
      setshowBtnLoader(false)
    }
  }

  const handleGetCode = async () => {
    let { email, password, confirmPassword, username } = formData;
    setshowBtnLoader(true)
    // Validation checks
    if (!email || !password || !confirmPassword || !username) {
      toast('error', 'All fields must be filled.');
      setshowBtnLoader(false)

      return;
    }

    if (password !== confirmPassword) {
      toast('error', 'Passwords do not match!');
      setshowBtnLoader(false)

      return;
    }

    if (password.length < 9) {
      toast('error', 'Weak Password!');
      setshowBtnLoader(false)

      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast('error', 'Invalid email format!');
      setshowBtnLoader(false)

      return;
    }

    // You can customize the regex or add more validation criteria based on your requirements
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!usernameRegex.test(username)) {
      toast('error', 'Invalid username format!');
      setshowBtnLoader(false)

      return;
    }

    try {
      await doesUserExist(email, username)
    } catch (error) {
      toast('error', 'Failed to check user existence');
    }
  };



  return (
    <View style={signupStyles.main}>
      <ImageBackground source={require('../../../../assets/images/cookie.jpg')} resizeMode='cover' style={signupStyles.backgroundImg}>
        <View style={signupStyles.formWraper}>

          <View style={signupStyles.headWrapper}>
            <Image source={require('../../../../assets/images/cookie-Logo.png')} style={signupStyles.image} />
            <Text style={signupStyles.headText}>Register to Cookie</Text>
            <Image source={require('../../../../assets/images/cookie-Logo.png')} style={signupStyles.image} />
          </View>

          <View style={signupStyles.inputWrapper}>
            <View style={signupStyles.iconWrapper}>
              <Fontisto name="email" size={20} color="#0e388e" />
            </View>
            <TextInput
              style={signupStyles.textInput}
              placeholder='email@xyz.com'
              placeholderTextColor='grey'
              cursorColor='orange'
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev, email: text
                }))
              }} />
          </View>

          <View style={signupStyles.inputWrapper}>
            <View style={signupStyles.iconWrapper}>
              <MaterialIcons name="drive-file-rename-outline" size={20} color="#0e388e" />
            </View>
            <TextInput
              style={signupStyles.textInput}
              placeholder='**username**'
              placeholderTextColor='grey'
              cursorColor='orange'
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev, username: text
                }))
              }} />
          </View>

          <View style={signupStyles.inputWrapper}>
            <View style={signupStyles.iconWrapper}>
              <Octicons name="key" size={20} color="#0e388e" />
            </View>
            <TextInput
              style={signupStyles.textInput}
              placeholder='**password**'
              placeholderTextColor='grey'
              cursorColor='orange'
              secureTextEntry={!showPass}
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev, password: text
                }))
              }} />
            <TouchableOpacity style={signupStyles.eyeTool} onPress={() => setShowPass(prev => !prev)}>
              {
                !showPass ?
                  <Feather name="eye-off" size={20} color="#0e388e" /> :
                  <Feather name="eye" size={20} color="#0e388e" />
              }
            </TouchableOpacity>
          </View>

          <View style={signupStyles.inputWrapper}>
            <View style={signupStyles.iconWrapper}>
              <Octicons name="key" size={20} color="#0e388e" />
            </View>
            <TextInput
              style={signupStyles.textInput}
              placeholder='**confirm password**'
              placeholderTextColor='grey'
              cursorColor='orange'
              secureTextEntry={!showConfirmPass}
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev, confirmPassword: text
                }))
              }} />
            <TouchableOpacity style={signupStyles.eyeTool} onPress={() => setShowConfirmPass(prev => !prev)}>
              {
                !showConfirmPass ?
                  <Feather name="eye-off" size={20} color="#0e388e" /> :
                  <Feather name="eye" size={20} color="#0e388e" />
              }
            </TouchableOpacity>
          </View>

          <View style={signupStyles.extraLinkWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={signupStyles.extraLink}>Already have an account?</Text>
            </TouchableOpacity>
          </View>

          {
            isCodeSent ?
              <>
                <View style={signupStyles.inputWrapper}>
                  <View style={signupStyles.iconWrapper}>
                    <Entypo name="code" size={20} color="#0e388e" />
                  </View>
                  <TextInput
                    style={signupStyles.textInput}
                    placeholder='**Enter verification code**'
                    placeholderTextColor='grey'
                    cursorColor='orange'
                    onChangeText={(text) => {
                      setFormData(prev => ({
                        ...prev, code: text
                      }))
                    }} />
                </View>
                <View style={signupStyles.extraLinkWrapper}>
                  <TouchableOpacity onPress={async () => {
                    setshowBtnLoader(true)
                    await sendCode(formData.email, otp)
                  }}>
                    <Text style={signupStyles.extraLink}>Resend Code</Text>
                  </TouchableOpacity>
                </View>
              </> : null
          }


          <TouchableOpacity style={signupStyles.loginBtn} onPress={
            isCodeSent ? handleSignup : handleGetCode
          }>
            {
              showBtnLoader ?
                <ActivityIndicator color='white' size='small' /> :
                <Text style={{ fontSize: 20, color: 'white' }}>{
                  isCodeSent ? 'Verify Code!' : 'Have it!'
                }</Text>
            }
          </TouchableOpacity>
        </View>
        <Toast />
      </ImageBackground>
    </View>)
}
