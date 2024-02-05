import React, { useState } from 'react'
import { Text, View, ImageBackground, TextInput, Button, TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import Toast from 'react-native-toast-message'
import forgetStyles from './forgetStyles'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'


const Forget = ({ navigation }) => {
    const [showBtnLoader, setShowBtnLoader] = useState(false);
    const [sectionCount, setSectionCount] = useState(1)``

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
            toast('success', 'Login Successfull.')
            setShowLoginLoader(false)
        }, 2000);
    }
    return (
        <View style={forgetStyles.main}>
            <ImageBackground source={require('../../../../assets/images/cookie.jpg')} resizeMode='cover' style={forgetStyles.backgroundImg}>
                {sectionCount === 1 ? <Section1 navigation={navigation} handleLogin={handleLogin} showBtnLoader={showBtnLoader} /> : null}
                {sectionCount === 2 ? <Section2 navigation={navigation} handleLogin={handleLogin} showBtnLoader={showBtnLoader} /> : null}
                {sectionCount === 3 ? <Section3 navigation={navigation} handleLogin={handleLogin} showBtnLoader={showBtnLoader} /> : null}

                <Toast />
            </ImageBackground>
        </View>)
}

const Section1 = ({ handleLogin, navigation, showBtnLoader }) => {
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
                    cursorColor='orange' />
            </View>

            <TouchableOpacity style={loginStyles.loginBtn} onPress={handleLogin}>
                {
                    showBtnLoader ?
                        <ActivityIndicator color='white' size='small' /> :
                        <Text style={{ fontSize: 20, color: 'white' }}>Get Code!</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

const Section2 = ({ handleLogin, navigation, showBtnLoader }) => {
    return (
        <View style={forgetStyles.formWraper}>
            <View style={forgetStyles.headWrapper}>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
                <Text style={forgetStyles.headText}>Recover Password</Text>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ width: 300 }}>
                    Enter the verification code sent your email. Don't forget to check the spam folder.
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
                    cursorColor='orange' />
            </View>

            <View style={forgetStyles.extraLinkWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={forgetStyles.extraLink}>Resend verification code?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={loginStyles.loginBtn} onPress={handleLogin}>
                {
                    showBtnLoader ?
                        <ActivityIndicator color='white' size='small' /> :
                        <Text style={{ fontSize: 20, color: 'white' }}>Verify it!</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

const Section3 = ({ handleLogin, navigation, showBtnLoader }) => {
    return (
        <View style={forgetStyles.formWraper}>
            <View style={forgetStyles.headWrapper}>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
                <Text style={forgetStyles.headText}>Create new Password</Text>
                <Image source={require('../../../../assets/images/cookie-Logo.png')} style={forgetStyles.image} />
            </View>
            <View style={loginStyles.inputWrapper}>
                <View style={loginStyles.iconWrapper}>
                    <Octicons name="key" size={20} color="#0e388e" />
                </View>
                <TextInput
                    style={loginStyles.textInput}
                    placeholder='**enter new password**'
                    placeholderTextColor='grey'
                    cursorColor='orange'
                    secureTextEntry={true} />
            </View>
            <View style={loginStyles.inputWrapper}>
                <View style={loginStyles.iconWrapper}>
                    <Octicons name="key" size={20} color="#0e388e" />
                </View>
                <TextInput
                    style={loginStyles.textInput}
                    placeholder='**confirm password**'
                    placeholderTextColor='grey'
                    cursorColor='orange'
                    secureTextEntry={true} />
            </View>

            <TouchableOpacity style={loginStyles.changePassBtn} onPress={handleLogin}>
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