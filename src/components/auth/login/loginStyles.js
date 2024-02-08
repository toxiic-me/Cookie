import { StyleSheet } from "react-native";

export default loginStyles = StyleSheet.create({
    main: {
        flex: 1,
    },
    backgroundImg: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    formWraper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%'
    },
    headWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    headText: {
        color: '#a84503',
        fontSize: 26,
        borderBottomWidth: 2,
        borderBottomColor: '#a84503'
    },
    image: {
        width: 50,
        height: 50
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginTop: 30

    },
    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        height: '80%',
        borderWidth: 2,
        borderColor: '#0e388e',
        borderWidth: 2,
        borderColor: '#0e388e',
        borderRightWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 10
    },
    textInput: {
        color: 'white',
        borderWidth: 2,
        borderColor: '#0e388e',
        width: 250,
        height: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        height: 40,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 0,
        fontSize: 15
    },
    extraLinkWrapper: {
        flexDirection: 'row',
        width: 285,
        justifyContent: 'space-between',
    },
    extraLink: {
        color: 'slategrey'
    },
    loginBtn: {
        marginTop: 40,
        backgroundColor: '#0e388e',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        borderRadius: 10,
        paddingVertical: 5,
        height: 40
    },
    eyeTool: {
        position: 'absolute',
        right: 10
    }
})