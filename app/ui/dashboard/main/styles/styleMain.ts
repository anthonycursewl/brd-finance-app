import { StyleSheet } from "react-native"

export const styleMain = StyleSheet.create({
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
        borderColor: 'rgba(255, 207, 151, 0.58)',
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
        backgroundColor: 'rgba(252, 251, 255, 0.72)',
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
    },
    seeCategoriesTitle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        padding: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        overflow: 'hidden',
    },
    seeCategories: {
        paddingVertical: 15,
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: 'rgba(212, 203, 121, 0.58)',
        gap: 14
    },
    newCategory: {
        flexDirection: 'row',
        alignItems: 'center', 
        gap: 5, 
        paddingVertical: 4, 
        paddingHorizontal: 8, 
        borderColor: 'rgba(236, 177, 67, 0.81)', 
        borderWidth: 1, 
        borderRadius: 50,
    }
})