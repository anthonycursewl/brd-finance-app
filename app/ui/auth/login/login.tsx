// Components
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native"
import { StatusBar } from "expo-status-bar"
import TextWithColor from "@/app/shared/components/TextWithColor"

// Interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGloba"

// Hooks
import { useEffect, useState } from "react"
import { useFetch } from "@/app/shared/auth/services/useFetch"
import { useGlobalState } from "@/app/shared/GlobalState/GlobalState"

// Auth
import { save } from "@/app/shared/auth/services/useAuth"

// Styling
import { styleLogin } from "./styles/styleLogin"
import { BRD_API_URL } from "@/app/config/breadriuss.config"

export interface FormData {
    email: string;
    password: string;
}

export default function Login({ navigation }: INavGlobal) {
    const imgLogo = 'https://www.breadriuss.com/logo_recortado.png'
    const [data, setData] = useState<FormData>({ email: '', password: ''})
    const [loading, setLoading] = useState<boolean>(false)
    const { setIsAuthenticated, IsAuthenticated } = useGlobalState()

    const handlePressButtonLogin = async () => {
        if (!data.email || !data.password) {
            Alert.alert('BRD | Error', 'Please enter email and password.');
            return
        }
        const dataClean = { email: data.email.trim(), password: data.password.trim() }
        const { response, error } = await useFetch(
            { 
                options: {
                    url: `${BRD_API_URL}/user/login`,
                    method: 'POST',
                    body: dataClean,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ''
                    }
                },
                setLoading: setLoading
            })
    
            if (error) {
                Alert.alert('BRD | Error', error.toString());
                return
            }
    
            if (response) {
                const { refreshToken, token } = response
                setIsAuthenticated(true)
                await save(token, 'AuthToken')
                await save(refreshToken, 'RefreshToken')
                navigation.navigate('Main')
            }
    }

    const CustomAuthButton = () => {
        if (loading) {
            return (
                <TouchableOpacity style={styleLogin.btnLogin} disabled={true}>
                    <TextWithColor color="rgb(95, 95, 95)">Loading...</TextWithColor>
                </TouchableOpacity>
            )
        } 

        if (IsAuthenticated) {
            return (
                <TouchableOpacity style={styleLogin.btnLogin} 
                    onPress={() => navigation.navigate('Main')}
                >
                    <TextWithColor color="rgb(95, 95, 95)">Dashboard</TextWithColor>
                </TouchableOpacity>
            )
        }

        if (!IsAuthenticated) {
            return (
                <TouchableOpacity style={styleLogin.btnLogin} 
                    onPress={() => {handlePressButtonLogin()}}
                >
                    <TextWithColor color="rgb(95, 95, 95)">Sig in</TextWithColor>
                </TouchableOpacity>
            )
        }
    }


    useEffect(() => {
        if (IsAuthenticated) {
            navigation.navigate('Main')
        }
    }, [])

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
                    
                    {
                    !IsAuthenticated ? (
                        <>
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
                        </>
                    ): (
                        <>
                            <View style={{ width: '100%', alignItems: 'center'}}>
                                <TextWithColor color="rgb(70, 69, 69)">You are logged in. Go to Dashboard.</TextWithColor>
                            </View>
                        </>
                    )
                    }

                    <View>
                        <CustomAuthButton />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

