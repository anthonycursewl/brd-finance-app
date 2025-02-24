import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from "react-native"

// components
import TextWithColor from "@/app/shared/components/TextWithColor"
import { LinearGradient } from "expo-linear-gradient"
import { INavGlobal } from "@/app/shared/interfaces/INavGloba"

export default function Main({ navigation }: INavGlobal) {
    const profilePicUrl = 'https://t4.ftcdn.net/jpg/03/73/50/11/360_F_373501182_AW73b2wvfm9wBuar0JYwKBeF8NAUHDOH.jpg' 
    const headerApp = 'https://png.pngtree.com/png-clipart/20230315/original/pngtree-abstract-wave-lines-purple-background-png-image_8988848.png'

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
                    <TextWithColor color="rgb(39, 39, 39)" style={{ fontSize: 20, fontWeight: 'bold' }}>Hi Anthony!</TextWithColor>
                    <TextWithColor color="rgb(116, 116, 116)" style={{ fontSize: 12 }}>You've earned <TextWithColor color="rgb(41, 180, 76)">$23.00</TextWithColor> this month.</TextWithColor>
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

            </View>
        </SafeAreaView>
    )
}

const styleMain = StyleSheet.create({
    mainDash: {
        width: '100%',
        height: '100%',
        paddingTop: 55,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(247, 247, 247, 0.99)',
        position: 'relative'
    }, 
    mainDashContainer: {
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20
    },
    headerProfile: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    headerImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: 'rgb(180, 181, 247)',
        borderWidth: 1
    },
    middleProfile: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%'
    },
    totalBalance: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        gap: 2,
        backgroundColor: 'rgb(240, 239, 241)',
        borderColor: 'rgba(196, 196, 196, 0.58)',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.13)'
    },
    decorationGradientLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        backgroundColor: 'rgba(163, 106, 255, 0.72)',
        filter: 'blur(75px)',
        borderRadius: 100,
        transform: [{ translateX: -70 }, { translateY: -100 }, { rotate: '30deg' }],
    },
    decorationImage: {
        position: 'absolute',
        top: -100,
        left: -60,
        width: 250,
        height: 250,
        resizeMode: 'cover',
        transform: [{ rotate: '20deg' }],
        pointerEvents: 'none',
        opacity: .2,
    },
    decorationGradientRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 200,
        height: 200,
        backgroundColor: 'rgba(255, 203, 106, 0.72)',
        filter: 'blur(75px)',
        borderRadius: 100,
        transform: [{ translateX: 70 }, { translateY: -100 }, { rotate: '30deg' }],
    },
    buttonNewInvoice: {
        backgroundColor: 'rgb(241, 241, 241)',
        borderColor: 'rgba(212, 203, 121, 0.58)',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    buttonHistoryInvoice: {
        backgroundColor: 'rgba(176, 167, 253, 0.6)',
        borderColor: 'rgba(164, 133, 235, 0.58)',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    }
})