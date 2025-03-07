import { SafeAreaView, View, Alert, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"

import { useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { useFetch } from "@/app/shared/auth/services/useFetch"

import { BRD_API_URL } from "@/app/config/breadriuss.config"

// interfaces
import { InvoiceData } from "../interfaces/InvoiceTypes"
// Services
import { get } from "@/app/shared/auth/services/useAuth"
import { DiscountInfo } from "../ShowByCategory/ShowByCategory"
import * as Clipboard from 'expo-clipboard';


export default function InvoiceDetails() {
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({ to: '', from: '', category_id: '', description: '', items: [], issuedAt: new Date().toISOString(), tax: 0, discount: 0, id: '', is_paid: false })
    const [loading, setLoading] = useState<boolean>(false);

    const ispaid = require('@/assets/images/is_paid_icon.png')
    const isunpaid = require('@/assets/images/is_unpaid_icon.png')
    
    const invoiced = useRoute()
    const { invoice }= invoiced.params as { invoice: DiscountInfo }

    const sub_total = invoice.items.map((item) => parseInt(item.quantity.toString()) * parseFloat(item.unitPrice.toString())).reduce((a, b) => a + b, 0) 
    const cal =  sub_total * (parseFloat(invoice.type_amount.toString()) / 100)
    const total = invoice.type === "discount" ? sub_total - cal : sub_total + cal

    const isDiscountOrTax = ({ type }: { type: string }) =>{
        if (type === 'discount') {
            return <TextWithColor style={{ fontWeight: 'bold', fontSize: 16, color: 'rgb(228, 64, 64)' }}>-${cal.toFixed(2)}</TextWithColor>
        }

        if (type === 'tax') {
            return <TextWithColor style={{ fontWeight: 'bold', fontSize: 16, color: 'rgb(51, 204, 89)' }}>+${cal.toFixed(2)}</TextWithColor>
        }

        return <TextWithColor style={{ fontWeight: 'bold', fontSize: 16 }}>$0.00</TextWithColor>
    }

    const copyToClipboard = (text: string) => {
        Clipboard.setStringAsync(text)
        Alert.alert('BRD | Success', 'Copied to clipboard')
    }

    const linkToReadOnlyInvoice: string = `https://brdf.breadriuss.com/invoice/readonly?id=${invoice.id}&from=${invoice.users.email}&to=${invoice.to}`

  return (
    <ScrollView>
        <SafeAreaView style={styleDetailsInvoice.mainInvoice}>
            <View style={styleDetailsInvoice.decorationGradientLeft}></View>

            <View style={styleDetailsInvoice.mainInvoiceContainer}>
                <View style={styleDetailsInvoice.invoiceHeader}>
                    <TextWithColor color="rgb(39, 39, 39)" style={{ fontSize: 45, fontWeight: 'bold' }}>${total.toFixed(2)}</TextWithColor>

                    <View style={styleDetailsInvoice.invoiceStatus}>
                        <View style={styleDetailsInvoice.invoiceStatusContainer}>
                            <Image source={invoice.is_paid ? ispaid : isunpaid} style={styleDetailsInvoice.invoiceStatusIcon} />
                            <TextWithColor color={invoice.is_paid ? 'rgb(38, 167, 70)' : 'rgb(228, 64, 64)'}>{invoice.is_paid ? 'PAID' : 'UNPAID'}</TextWithColor>
                        </View>
                        <View style={styleDetailsInvoice.invoiceStatusContainer}> 
                            <TextWithColor color="rgb(167, 149, 233)" style={{ fontSize: 15 }}>#</TextWithColor>
                            <TextWithColor>{invoice.id}</TextWithColor>
                        </View>
                        <View style={styleDetailsInvoice.invoiceStatusContainer}>
                            <Image source={require('@/assets/images/icon_date.png')} style={styleDetailsInvoice.invoiceStatusIcon} />
                            <TextWithColor>{invoice.issuedAt.slice(0, 10)}</TextWithColor>
                        </View>
                    </View>
                    
                    <View style={styleDetailsInvoice.invoiceData}>
                        <View style={styleDetailsInvoice.invoiceDataContainer}>
                            <TextWithColor color="rgb(37, 37, 37)" style={{ fontSize: 15 }}>Subtotal</TextWithColor>
                            <TextWithColor style={{ fontWeight: 'bold', fontSize: 16 }}>${sub_total.toFixed(2)}</TextWithColor>
                        </View>

                        <View style={styleDetailsInvoice.invoiceDataContainer}>
                            <TextWithColor color="rgb(37, 37, 37)" style={{ fontSize: 15 }}>{invoice.type_amount}% {invoice.type == 'discount' ? 'Discount' : invoice.type == 'tax' ? 'Tax' : 'None'}</TextWithColor>
                            <TextWithColor style={{ fontWeight: 'bold', fontSize: 16 }}>{isDiscountOrTax({ type: invoice.type })}</TextWithColor>
                        </View>
                    </View>

                    <View style={{ width: '100%', marginTop: 10, gap: 5, paddingTop: 10, paddingHorizontal: 5, borderTopColor: 'rgba(85, 85, 85, 0.35)', borderTopWidth: .5 }}>
                        <TextWithColor color="rgb(167, 149, 233)" style={{ fontSize: 13 }}>To</TextWithColor>
                        <TextWithColor>{invoice.to}</TextWithColor>
                    </View>

                    <View style={{ width: '100%', marginTop: 10, gap: 5, paddingTop: 10, paddingHorizontal: 5, paddingBottom: 5, borderTopColor: 'rgba(85, 85, 85, 0.35)', borderTopWidth: .5 }}>
                        <TextWithColor color="rgb(167, 149, 233)" style={{ fontSize: 13 }}>Description</TextWithColor>
                        <TextWithColor>{invoice.description}</TextWithColor>
                    </View>

                    <View style={{ width: '100%', marginTop: 10, gap: 5, paddingTop: 10, paddingHorizontal: 5, paddingBottom: 5, borderTopColor: 'rgba(85, 85, 85, 0.35)', borderTopWidth: .5 }}>
                        <TextWithColor color="rgb(167, 149, 233)" style={{ fontSize: 13 }}>From</TextWithColor>
                        <TextWithColor>{invoice.users.name}</TextWithColor>
                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                        onPress={() => copyToClipboard(invoice.users.email)}
                        >
                            <TextWithColor style={{ color: 'rgb(167, 149, 233)', textDecorationLine: 'underline' }}>{invoice.users.email}</TextWithColor>
                            <Image source={require('@/assets/images/icon_copy_email.png')} style={{ width: 20, height: 20 }}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal style={{ width: '100%', marginTop: 10, paddingTop: 10, paddingHorizontal: 5, paddingBottom: 5, borderTopColor: 'rgba(85, 85, 85, 0.35)', borderTopWidth: .5 }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <TouchableOpacity style={styleDetailsInvoice.invoiceShare}
                            onPress={() => 
                                copyToClipboard(linkToReadOnlyInvoice)
                            }
                            >
                                <Image source={require('@/assets/images/icon_share_invoice.png')} style={{ width: 12, height: 12 }}/>
                                <TextWithColor>Share Invoice</TextWithColor>
                            </TouchableOpacity>
                            <TouchableOpacity style={styleDetailsInvoice.invoiceShare}
                            onPress={() => copyToClipboard(invoice.id ? invoice.id : '')}>
                                <TextWithColor>#</TextWithColor>
                                <TextWithColor>Copy ID</TextWithColor>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', gap: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image source={require('@/assets/images/icon_items.png')} style={styleDetailsInvoice.invoiceStatusIcon} />
                        <TextWithColor color="rgb(37, 37, 37)" style={{ fontSize: 14 }}>{invoice.items.length} | Items</TextWithColor>
                    </View>

                    <View style={{ width: '100%', padding: 10, borderColor: 'rgb(85, 85, 85)', borderWidth: 1, borderStyle: 'dashed', borderRadius: 10, marginTop: 10 }}> 
                    {
                        invoice.items.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <TextWithColor key={index}><TextWithColor color="rgba(121, 107, 170, 0.78)">x{item.quantity} </TextWithColor> 
                                {item.product}</TextWithColor>
                                <TextWithColor>${parseFloat(item.unitPrice.toString()).toFixed(2)}</TextWithColor>
                            </View>
                            ))
                        }
                    </View>

                </View>
                
            </View>

        </SafeAreaView>
    </ScrollView>
     );
}

const styleDetailsInvoice = StyleSheet.create({
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
    width: '92%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  decorationGradientLeft: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(153, 126, 226, 0.7)',
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
    invoiceHeader: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    invoiceId: {
        backgroundColor: 'rgb(233, 232, 232)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10
    },
    invoiceData: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'rgb(240, 240, 240)',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(211, 211, 211, 0.35)'
    }, 
    invoiceDataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    invoiceStatus: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    invoiceStatusIcon: {
        width: 18,
        height: 18
    },
    invoiceStatusContainer: {
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'rgb(241, 241, 241)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10
    },
    invoiceShare: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: 'rgb(228, 225, 225)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10
    }

});
