// components
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { LinearGradient } from "expo-linear-gradient"

// Interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGloba"

// Hooks
import { useGlobalState } from "@/app/shared/GlobalState/GlobalState"
import { useEffect, useState } from "react"

// Styling
import { styleMain } from "./styles/styleMain"

// services
import { verify } from "./services/verifyProfile"
import { profilePicUrl, headerApp } from "@/app/shared/constants/profileImages"
import { transform } from "@babel/core"

export default function Main({ navigation }: INavGlobal) {
    const [loading, setLoading] = useState<boolean>(false)
    const { user, setUser, setIsAuthenticated } = useGlobalState()

    const categories: string[] = ['Home', 'Health', 'Food', 'Transport', 'Entertainment', 'Other']

    useEffect(() => {
        if (user.id === '') {
            verify({ setLoading, setIsAuthenticated, setUser, Alert, rt: { navigation }})
        }
    }, [])

    return (
        <SafeAreaView style={styleMain.mainDash}>
            
            <Image source={{ uri: headerApp }} style={styleMain.decorationImage}/>
            <View style={styleMain.decorationGradientLeft}></View>
            <View style={styleMain.decorationGradientRight}></View>

            <View style={styleMain.mainDashContainer}>
                <View style={styleMain.headerProfile}>
                    <TextWithColor>Main</TextWithColor>
                    <Image source={{ uri: profilePicUrl }} style={styleMain.headerImg} />
                </View>

                <View style={styleMain.middleProfile}>
                    <TextWithColor color="rgb(39, 39, 39)" style={{ fontSize: 20, fontWeight: 'bold' }}>Hello {loading ? '...' : user.name}!</TextWithColor>
                    <TextWithColor color="rgb(116, 116, 116)" style={{ fontSize: 12, backgroundColor: 'rgba(228, 228, 228, 0.5)', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 15, transform: [{ translateX: -5 }] }}>You've earned <TextWithColor color="rgb(41, 180, 76)">$23.00</TextWithColor> this month.</TextWithColor>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', gap: 10 }}>
                    <TouchableOpacity onPress={() => {navigation.navigate('NewInvoice')}} style={styleMain.buttonNewInvoice}>
                        <Image source={require('../../../../assets/images/new-invoice.png')} style={{ width: 10, height: 10 }}/> 
                        <TextWithColor color="#ddac0c">New Invoice</TextWithColor>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {console.log("Wola")}} style={styleMain.buttonHistoryInvoice}> 
                        <Image source={require('../../../../assets/images/history-invoice.png')} style={{ width: 10, height: 10 }}/> 
                        <TextWithColor color="rgb(241, 241, 241)">Invoice History</TextWithColor>
                    </TouchableOpacity>
                </View>

                <LinearGradient colors={['rgb(231, 230, 231)', 'rgb(246, 244, 253)', 'rgb(238, 238, 238)']} start={{ x: 0.1, y: 4.0 }} end={{ x: 0.0, y: 0.0 }} style={styleMain.totalBalance}>
                    <TextWithColor>BRD | Total Balance</TextWithColor>
                    <TextWithColor style={{ fontSize: 11 }} color="rgba(77, 77, 77, 0.54)">Balance available of this month.</TextWithColor>
                    <TextWithColor color="rgb(41, 180, 76)" style={{ fontSize: 25, fontWeight: 'bold' }}>$23.00</TextWithColor>
                </LinearGradient>

                <View style={{ width: '100%', alignItems: 'flex-start' }}>
                    <LinearGradient colors={['rgb(231, 230, 231)', 'rgb(246, 244, 253)', 'rgb(230, 218, 252)', 'rgba(255, 203, 106, 0.46)']} start={{ x: 0.5, y: 5.0 }} end={{ x: 0.0, y: 0.0 }} style={styleMain.seeCategoriesTitle}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Image source={require('../../../../assets/images/logo-cat.png')} style={{ width: 25, height: 25 }}/>
                                <TextWithColor color="rgb(139, 87, 28)" style={{ fontSize: 15 }}>See categories</TextWithColor>
                            </View>
                            <TextWithColor style={{ fontSize: 11, marginTop: 4 }} color="rgba(92, 58, 18, 0.52)">Categories of your invoices. You can take a look of your current categories or registew new ones.</TextWithColor>
                        </View>
                    </LinearGradient>

                    <View style={styleMain.seeCategories}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8, borderColor: 'rgb(236, 177, 67)', borderWidth: 1, borderRadius: 50 }}>
                            <Image source={require('../../../../assets/images/home-cat.png')} style={{ width: 25, height: 25 }}/>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8, borderColor: 'rgb(236, 177, 67)', borderWidth: 1, borderRadius: 50 }}>
                            <Image source={require('../../../../assets/images/food-cat.png')} style={{ width: 25, height: 25 }}/>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8, borderColor: 'rgb(236, 177, 67)', borderWidth: 1, borderRadius: 50 }}>
                            <Image source={require('../../../../assets/images/entertainment-cat.png')} style={{ width: 25, height: 25 }}/>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8, borderColor: 'rgb(236, 177, 67)', borderWidth: 1, borderRadius: 50 }}>
                            <Image source={require('../../../../assets/images/transport-cat.png')} style={{ width: 25, height: 25 }}/>
                        </View>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 8 }}>

                        <TouchableOpacity style={styleMain.newCategory}
                        onPress={() => navigation.navigate('NewCategory')}>
                            <Image source={require('../../../../assets/images/new-cat.png')} style={{ width: 18, height: 18 }}/>
                            <TextWithColor color="rgb(223, 154, 50)" style={{ fontSize: 13 }}>New category</TextWithColor>
                        </TouchableOpacity>

                        <TouchableOpacity style={styleMain.newCategory}
                        onPress={() => navigation.navigate('ShowCategories')}
                        >
                            <Image source={require('../../../../assets/images/copy-cat.png')} style={{ width: 18, height: 18 }}/>
                            <TextWithColor color="rgb(223, 154, 50)" style={{ fontSize: 13 }}>Categories</TextWithColor>
                        </TouchableOpacity>

                    </View>
                </View>

            

            </View>
        </SafeAreaView>
    )
}

