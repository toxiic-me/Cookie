import React, { useState } from 'react'
import { Text, View, ImageBackground, TextInput, Button, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Config from 'react-native-config'
import Toast from 'react-native-toast-message'
import forgetStyles from './forgetStyles'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'


const Forget = ({ navigation }) => {
    const [showBtnLoader, setShowBtnLoader] = useState(false);
    const [section, setSection] = useState(1)
    const [otp, setOtp] = useState(Math.floor(Math.random() * 100000000).toString().slice(0, 5))
    const [formData, setFormData] = useState({
        email: '',
        code: '',
        password: '',
        confirmPassword: ''
    })

    const toast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            text1Style: { color: 'green' }
        });
    }

    const updatePassword = async (email, password) => {
        try {
            let response = await fetch(`${Config.BASE_URL}/changePassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            let result = await response.json();
            if (result.message === 'Password updated successfully') {
                toast('success', result.message)
                setShowBtnLoader(false)
                setTimeout(() => {
                    navigation.navigate('Login')
                }, 1500);
            } else {
                toast('error', result.error)
                setShowBtnLoader(false)
            }
        } catch (error) {
            toast('error', 'Unexpected error occurred')
        }
    }

    const handleSubmit = () => {
        setShowBtnLoader(true)
        const { email, password, confirmPassword, code } = formData;
        if (section === 1) {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast('error', 'Invalid email format!');
                setShowBtnLoader(false)
                return;
            }
            sendCode(email, otp);
        }
        else if (section === 2) {
            if (otp !== code) {
                toast('error', 'Invalid verification code')
                setShowBtnLoader(false)
            } else {
                setSection(3)
                setShowBtnLoader(false)
            }
        } else if (section === 3) {
            if (password === confirmPassword) {
                updatePassword(email, password)
            } else {
                toast('error', 'Passwords do not match')
            }
        }
    }
    const handleLogin = () => {
        setShowBtnLoader(true)
        setTimeout(() => {
            toast('success', 'Login Successfull.')
            setShowBtnLoader(false)
        }, 2000);
    }
    const sendCode = async (email, otp) => {
        try {
            let response = await fetch(`${Config.BASE_URL}/sendOtp`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            })
            let { message } = await response.json();
            setShowBtnLoader(false)
            toast('success', message)
            if (section === 1) {
                setSection(2)
            }
        } catch (error) {
            toast('error', 'Server Internal Error')
            showBtnLoader(false)
        }
    }

    return (
        <View style={forgetStyles.main}>
            <ImageBackground source={require('../../../../assets/images/cookie.jpg')} resizeMode='cover' style={forgetStyles.backgroundImg}>

                {section === 1 ? <Section1
                    handleSubmit={handleSubmit}
                    showBtnLoader={showBtnLoader}
                    setFormData={setFormData} /> : null}

                {section === 2 ? <Section2
                    handleLogin={handleLogin}
                    showBtnLoader={showBtnLoader}
                    setShowBtnLoader={setShowBtnLoader}
                    handleSubmit={handleSubmit}
                    sendCode={sendCode}
                    setFormData={setFormData}
                    otp={otp}
                    formData={formData} /> : null}

                {section === 3 ? <Section3
                    navigation={navigation}
                    handleLogin={handleLogin}
                    setFormData={setFormData}
                    showBtnLoader={showBtnLoader}
                    handleSubmit={handleSubmit} /> : null}

                <Toast />
            </ImageBackground>
        </View>)
}

const Section1 = ({ handleSubmit, showBtnLoader, setFormData }) => {

    return (
        <View style={forgetStyles.formWraper}>
            <View style={forgetStyles.headWrapper}>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
                <Text style={forgetStyles.headText}>Recover Password</Text>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
            </View>
            <Text>Enter your email to get the verification code.</Text>
            <View style={forgetStyles.inputWrapper}>
                <View style={forgetStyles.iconWrapper}>
                    <Fontisto name="email" size={20} color="#0e388e" />
                </View>
                <TextInput
                    style={forgetStyles.textInput}
                    placeholder='email@xyz.com'
                    placeholderTextColor='grey'
                    cursorColor='orange'
                    onChangeText={(text) => {
                        setFormData(prev => ({ ...prev, email: text }))
                    }} />
            </View>

            <TouchableOpacity style={forgetStyles.loginBtn} >
                {
                    showBtnLoader ?
                        <ActivityIndicator color='white' size='small' /> :
                        <TouchableOpacity onPress={handleSubmit} >
                            <Text style={{ fontSize: 20, color: 'white' }}>Get Code!</Text>
                        </TouchableOpacity>
                }
            </TouchableOpacity>
        </View>
    )
}

const Section2 = ({ showBtnLoader, formData, otp, setShowBtnLoader, sendCode, setFormData, handleSubmit }) => {
    const handleResendCode = () => {
        setShowBtnLoader(true)
        const { email } = formData;
        sendCode(email, otp)
    }
    return (
        <View style={forgetStyles.formWraper}>
            <View style={forgetStyles.headWrapper}>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
                <Text style={forgetStyles.headText}>Recover Password</Text>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ width: 300 }}>
                    Enter the verification code sent to your email. Don't forget to check the spam folder.
                </Text>
            </View>
            <View style={forgetStyles.inputWrapper}>
                <View style={forgetStyles.iconWrapper}>
                    <Entypo name="code" size={20} color="#0e388e" />
                </View>
                <TextInput
                    style={forgetStyles.textInput}
                    placeholder='**verification code**'
                    placeholderTextColor='grey'
                    cursorColor='orange'
                    onChangeText={(text) => {
                        setFormData(prev => ({ ...prev, code: text }))
                    }} />
            </View>

            <View style={forgetStyles.extraLinkWrapper}>
                <TouchableOpacity onPress={handleResendCode}>
                    <Text style={forgetStyles.extraLink}>Resend verification code?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={loginStyles.loginBtn} >
                {
                    showBtnLoader ?
                        <ActivityIndicator color='white' size='small' /> :
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Verify it!</Text>
                        </TouchableOpacity>
                }
            </TouchableOpacity>
        </View>
    )
}

const Section3 = ({ showBtnLoader, handleSubmit, setFormData }) => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    return (
        <View style={forgetStyles.formWraper}>
            <View style={forgetStyles.headWrapper}>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
                <Text style={forgetStyles.headText}>Create new Password</Text>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
            </View>

            <View style={forgetStyles.inputWrapper}>
                <View style={forgetStyles.iconWrapper}>
                    <Octicons name="key" size={20} color="#0e388e" />
                </View>
                <TextInput
                    style={forgetStyles.textInput}
                    placeholder='**password**'
                    placeholderTextColor='grey'
                    cursorColor='orange'
                    secureTextEntry={!showPass}
                    onChangeText={(text) => {
                        setFormData(prev => ({
                            ...prev, password: text
                        }))
                    }} />
                <TouchableOpacity style={forgetStyles.eyeTool} onPress={() => setShowPass(prev => !prev)}>
                    {
                        !showPass ?
                            <Feather name="eye-off" size={20} color="#0e388e" /> :
                            <Feather name="eye" size={20} color="#0e388e" />
                    }
                </TouchableOpacity>
            </View>

            <View style={forgetStyles.inputWrapper}>
                <View style={forgetStyles.iconWrapper}>
                    <Octicons name="key" size={20} color="#0e388e" />
                </View>
                <TextInput
                    style={forgetStyles.textInput}
                    placeholder='**confirm password**'
                    placeholderTextColor='grey'
                    cursorColor='orange'
                    secureTextEntry={!showConfirmPass}
                    onChangeText={(text) => {
                        setFormData(prev => ({
                            ...prev, confirmPassword: text
                        }))
                    }} />
                <TouchableOpacity style={forgetStyles.eyeTool} onPress={() => setShowConfirmPass(prev => !prev)}>
                    {
                        !showConfirmPass ?
                            <Feather name="eye-off" size={20} color="#0e388e" /> :
                            <Feather name="eye" size={20} color="#0e388e" />
                    }
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={loginStyles.changePassBtn} onPress={handleSubmit}>
                {
                    showBtnLoader ?
                        <ActivityIndicator color='white' size='small' /> :
                        <Text style={{ fontSize: 20, color: 'white' }}>Change Password</Text>
                }
            </TouchableOpacity>
        </View>
    )
}


export default Forget