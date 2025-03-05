import { StyleSheet } from "react-native";
export const styleInvoicesCategory = StyleSheet.create({
    mainInvoice: {
        width: "100%",
        height: "100%",
        paddingTop: 55,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(247, 247, 247, 0.99)",
        position: "relative",
    },
    mainInvoiceContainer: {
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    decorationGradientLeft: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 200,
        height: 200,
        backgroundColor: 'rgba(255, 203, 106, 0.72)',
        filter: 'blur(75px)',
        borderRadius: 100,
        transform: [{ translateX: -220 }, { translateY: -95 }, { rotate: '30deg' }],
    },
    buttonAddItem: {
        backgroundColor: 'rgb(255, 203, 106)',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    buttonCreateInvoice: {
        backgroundColor: 'rgb(255, 203, 106)',
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonCancelInvoice: {
        backgroundColor: 'rgb(255, 106, 106)',
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    cardInvoice: {
        backgroundColor: 'rgba(245, 244, 244, 0.72)',
        borderColor: 'rgba(238, 206, 148, 0.83)',
        borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
    },
    cardInvoiceContainer: {
        width: '100%',
        gap: 10,
        padding: 10
    },
    cardInvoiceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: 20,
    },
    cardInvoiceBody: {
        width: '100%',
        gap: 10
    },
    cardStatusPaid: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(127, 218, 132, 0.44)',
        padding: 2,
        borderRadius: 10
    },
    cardStatusUnpaid: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(250, 152, 145, 0.44)',
        padding: 2,
        borderRadius: 10
    }
});