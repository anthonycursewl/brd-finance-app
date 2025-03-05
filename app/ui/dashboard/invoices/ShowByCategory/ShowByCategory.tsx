import { INavGlobal } from "@/app/shared/interfaces/INavGloba";
import { Image, StyleSheet, FlatList, View, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";

// Constants
import { BRD_API_URL } from "@/app/config/breadriuss.config";

// Interfaces
import { CategoryType } from "@/app/shared/interfaces/ICategory";

// Hooks
import { useRoute } from "@react-navigation/native";
import { useFetch } from "@/app/shared/auth/services/useFetch";
import { useEffect, useState } from "react";

// Services
import { get } from "@/app/shared/auth/services/useAuth";
import { ItemInvoice } from "../interfaces/InvoiceTypes";
import { parseDate } from "@/app/config/services/parserDate";
import { parse } from "@babel/core";

interface CategoryParams {
    item: CategoryType
}

interface Item {
    id: string
    product: string;
    unitPrice: number;
    quantity: number;
    [key: string]: any;
  }
  
  interface Users {
    email: string;
    name: string;
  }
  
  interface DiscountInfo {
    description: null | string;
    issuedAt: string;
    items: Item[];
    to: string;
    type: string;
    type_amount: number | string;
    users: Users;
    is_paid: string;
  }

export default function ShowByCategory({ navigation }: INavGlobal) {
    const [loading, setLoading] = useState<boolean>(false)
    const [invoices, setInvoices] = useState<DiscountInfo[]>([])

    const route = useRoute() 
    const { item } = route.params as CategoryParams
    const paidIcon = require('@/assets/images/is_paid_icon.png')
    const unpaidIcon = require('@/assets/images/is_unpaid_icon.png')

    const getInvoicesByCategory = async () => {
        const { response, error } = await useFetch({
            options: {
                url: `${BRD_API_URL}/invoice/find/category/${item.id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${await get('AuthToken').then(res => res?.token)}`
                },
                body: null
            },
            setLoading: setLoading
        })

        if (error) {
            Alert.alert('BRD | Error', error.toString());
            return
        }

        if (response) {
            console.log(response)
            setInvoices(response)
        }
    }
        

    useEffect(() => {
        //getInvoicesByCategory()
    }, [])

    return (
        <SafeAreaView style={styleInvoicesCategory.mainInvoice}>
            <View style={styleInvoicesCategory.decorationGradientLeft}></View>

            <View style={styleInvoicesCategory.mainInvoiceContainer}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 10, borderRadius: 12 }}>
                    <Image source={{ uri: item.icon }} style={{ width: 50, height: 50 }} />
                    <TextWithColor color="rgb(223, 161, 74)" style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</TextWithColor>
                </View>
                
                {loading ? 
                <ActivityIndicator size={"large"} color={"rgb(255, 203, 106)"}/> : 
                <FlatList data={invoices} renderItem={({ item: inv }: { item: DiscountInfo }) => (

                    <View style={styleInvoicesCategory.cardInvoice}>
                        <View style={styleInvoicesCategory.cardInvoiceContainer}>
                            <View style={styleInvoicesCategory.cardInvoiceHeader}>
                                <View>
                                    <View style={{ flexDirection: 'row', gap: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Image style={{ width: 18, height: 18 }} source={require('@/assets/images/icon_invoice_to.png')}/>
                                        <TextWithColor color="rgb(214, 175, 124)" style={{ fontSize: 13 }}>Invoice to</TextWithColor>
                                    </View>
                                    <TextWithColor color="rgb(82, 82, 82)" style={{ fontSize: 15 }}>{inv.to}</TextWithColor>
                                </View>
                                <TextWithColor color="rgb(116, 116, 116)" style={{ fontSize: 13 }}>{parseDate(inv.issuedAt)}</TextWithColor>
                            </View>

                            <View style={styleInvoicesCategory.cardInvoiceBody}>
                                <View style={{ gap: 4 }}>
                                    <View style={{ flexDirection: 'row', gap: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Image style={{ width: 20, height: 20 }} source={require('@/assets/images/icon_status.png')}/>
                                        <TextWithColor color="rgb(214, 175, 124)" style={{ fontSize: 12 }}>Status</TextWithColor>
                                    </View>
                                    <View style={inv.is_paid ? styleInvoicesCategory.cardStatusPaid : styleInvoicesCategory.cardStatusUnpaid}>
                                        <Image style={{ width: 20, height: 20 }} source={inv.is_paid ? paidIcon : unpaidIcon}/>
                                        <TextWithColor color="rgb(82, 82, 82)">{inv.is_paid ? 'Paid' : 'Unpaid'}</TextWithColor>
                                    </View>
                                </View>

                                <View style={{ gap: 2 }}>
                                    <View style={{ flexDirection: 'row', gap: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Image style={{ width: 20, height: 20 }} source={require('@/assets/images/icon_items.png')}/>
                                        <TextWithColor color="rgb(214, 175, 124)" style={{ fontSize: 12 }}>Items</TextWithColor>
                                    </View>
                                    {inv.items.slice(0, 3).map((item, index) => (
                                        <View key={index} style={{ gap: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', gap: 3 }}>
                                                <TextWithColor color="rgb(214, 175, 124)" style={{ fontSize: 12 }}>x{item.quantity}</TextWithColor>
                                                <TextWithColor color="rgb(82, 82, 82)" style={{ fontSize: 12 }}>{item.product}</TextWithColor>
                                            </View>

                                            <TextWithColor color='rgb(158, 126, 68)' style={{ fontSize: 12 }}>${item.unitPrice}</TextWithColor>
                                        </View>
                                    ))}
                                    {inv.items.length > 3 && (
                                        <TextWithColor color="rgb(82, 82, 82)" style={{ fontSize: 12 }}>+{inv.items.length - 3} more</TextWithColor>
                                    )}
                                </View>

                                <View style={{ gap: 3 }}>
                                    <TextWithColor color="rgb(214, 175, 124)" style={{ fontSize: 12 }}>Description</TextWithColor>
                                    <TextWithColor color="rgb(82, 82, 82)" style={{ fontSize: 14 }}>{inv.description}</TextWithColor>
                                </View>
                            </View>
                        </View>
                    </View>

                )}/>
                }

            </View>
        </SafeAreaView>
     );
}


const styleInvoicesCategory = StyleSheet.create({
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
