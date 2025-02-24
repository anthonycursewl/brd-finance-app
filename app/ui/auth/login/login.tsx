import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native"
import { StatusBar } from "expo-status-bar"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { useState } from "react"

import { INavGlobal } from "@/app/shared/interfaces/INavGloba"

export interface FormData {
    email: string;
    password: string;
}

export default function Login({ navigation }: INavGlobal) {
    const imgLogo = 'https://www.breadriuss.com/logo_recortado.png'
    const [data, setData] = useState<FormData>({ email: '', password: ''})

    const handlePressButtonLogin = () => {
        if (!data.email || !data.password) {
            Alert.alert('BRD | Error', 'Please enter email and password.');
            return
        }

        console.log(data)
        navigation.navigate('Main')
    }

    return (
        <SafeAreaView style={styleLogin.main}> 
            <StatusBar translucent={true} style="dark"/>
            <View style={styleLogin.decorationGradientRight}></View>
            <View style={styleLogin.decorationGradientLeft}></View>
            
            <View style={styleLogin.mainContainer}>

                <View style={styleLogin.infoContainerLogin}>
                    <View>
                        <Image source={{ uri: imgLogo }} style={styleLogin.imgLogo}/>
                    </View>

                    <View style={styleLogin.containerInput}>
                        <TextWithColor color="rgb(70, 69, 69)">Email</TextWithColor>
                        <TextInput placeholder="example@breadriuss.com" style={styleLogin.inputAuthLogin} 
                        onChangeText={(text) => setData({ ...data, email: text })}
                        value={data.email}
                        />
                    </View>

                    <View style={styleLogin.containerInput}>
                        <TextWithColor color="rgb(70, 69, 69)">Password</TextWithColor>
                        <TextInput placeholder="**********" style={styleLogin.inputAuthLogin} 
                        onChangeText={(text) => setData({ ...data, password: text })}
                        value={data.password}
                        />
                    </View>

                    <View>
                        <TouchableOpacity style={styleLogin.btnLogin} 
                        onPress={() => handlePressButtonLogin()}
                        >
                            <TextWithColor color="rgb(95, 95, 95)">Sign In</TextWithColor>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styleLogin = StyleSheet.create({ 
    main: {
        width: '100%',
        height: '100%',
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(247, 247, 247, 0.99)',
        position: 'relative'
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainerLogin: {   
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25
    },
    inputAuthLogin: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: 'rgb(238, 238, 238)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1
    },
    containerInput: {
        width: '100%',
        gap: 10
    },
    imgLogo: {
        width: 60,
        height: 50,
        filter: [{ grayscale: 1 }, { invert: 1 }, { dropShadow: '2px 4px 3px rgba(123, 114, 255, 0.5)' }],
        marginBottom: 20,
    },
    decorationGradientRight: {
        width: 190,
        height: 180,
        backgroundColor: 'rgba(255, 210, 114, 0.42)',
        position: 'absolute',
        filter: 'blur(50px)',
        borderRadius: 100,
        top: -50,
        right: -50,
        pointerEvents: 'none'
    },
    decorationGradientLeft: {
        width: 190,
        height: 180,
        backgroundColor: 'rgba(135, 114, 255, 0.41)',
        position: 'absolute',
        filter: 'blur(50px)',
        borderRadius: 100,
        top: -50,
        left: -50,
        pointerEvents: 'none'
    },
    btnLogin: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: 'rgb(233, 231, 231)',
        borderColor: 'rgba(48, 48, 48, 0.1)',
        borderWidth: 1
    }
})