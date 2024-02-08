import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const MainActivity = () => {
    const { email, username, userImage } = useSelector(state => state.userDataReducer)
    const dispatch = useDispatch()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>{JSON.stringify({ email, username, userImage })}</Text>
            <Button title='Logout' onPress={async () => {
                await AsyncStorage.removeItem('token')
                dispatch({
                    type: 'logoutUser'
                })
            }} />
        </View>
    )
}


export default MainActivity