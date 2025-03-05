// components
import { SafeAreaView, StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { Picker } from '@react-native-picker/picker';

// hooks
import { useEffect, useState } from "react";

// Interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGloba";
import { InvoiceData, DiscountOrTax } from "./interfaces/InvoiceTypes";

// Services
import { handleAddNewItem } from "./services/addNewItem";
import { useGlobalState } from "@/app/shared/GlobalState/GlobalState";
import { useFetch } from "@/app/shared/auth/services/useFetch";
import { BRD_API_URL } from "@/app/config/breadriuss.config";
import { get } from "@/app/shared/auth/services/useAuth";
import { CategoryType } from "@/app/shared/interfaces/ICategory";
import { generateNumericId } from "@/app/config/services/generatorIDs";

export default function NewInvoice({ navigation }: INavGlobal) {
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({ to: '', from: '', category_id: '', description: '', items: [], issuedAt: new Date().toISOString(), tax: 0, discount: 0, id: '', is_paid: false })
    const [isDiscountOrTax, setIsDiscountOrTax] = useState<DiscountOrTax>({ name: '', value: 0 })
    const [loading, setLoading] = useState<boolean>(false);
    const [invoiceId, setInvoiceId] = useState<string>('');

    const { item, items, setItem, setItems, categories, user, setCategories } = useGlobalState()

    let subtotal = items.map((item) => parseInt(item.quantity.toString()) * parseFloat(item.unitPrice.toString())).reduce((a, b) => a + b, 0)
    let total = isDiscountOrTax.name === 'Tax' ? subtotal * (isDiscountOrTax.value / 100) + subtotal : subtotal - (subtotal * (isDiscountOrTax.value / 100))

    const handlePress = async () => {
        if (!invoiceData.to || !invoiceData.category_id || !invoiceData.description) {
            Alert.alert('BRD | Error', 'Please fill all the fields.');
            return
        }

        if (items.length === 0) {
            return Alert.alert('BRD | Error', 'Please add at least one item.'); 
        }

        invoiceData.items = items
        invoiceData.from = user.id
        invoiceData.id = invoiceId

        const newInvoice = {
            id: invoiceData.id,
            to: invoiceData.to.trim(),
            from: invoiceData.from,
            category_id: invoiceData.category_id,
            description: invoiceData.description.trim(),
            items: invoiceData.items,
            issuedAt: invoiceData.issuedAt,
            type: isDiscountOrTax.name === 'Tax' ? 'tax' : 'discount',
            type_amount: isDiscountOrTax.value,
            is_paid: invoiceData.is_paid
        }

        const { response, error } = await useFetch({
            options: {
                url: `${BRD_API_URL}/invoice/save`,
                method: 'POST',
                body: newInvoice,
                headers: {
                    'Authorization': `${await get('AuthToken').then(res => res?.token)}`,
                    'Content-Type': 'application/json'
                }
            },
            setLoading: setLoading
        })

        if (error) {
            return Alert.alert('BRD | Error', error.toString());
        }

        if (response) {
            Alert.alert('BRD | Success', 'Invoice created successfully.');
            setItems([])
            setInvoiceData({ to: '', from: '', category_id: '', description: '', items: [], issuedAt: new Date().toISOString(), tax: 0, discount: 0, id: '', is_paid: false })
        }
     }

    const getData = async () => {
        if (categories.length === 0) {
            const { response, error } = await useFetch({ 
                options: {
                    url: `${BRD_API_URL}/category/find/all/${user.id}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `${await get('AuthToken').then(res => res?.token)}`,
                        'Content-Type': 'application/json'
                    }
                },
                setLoading: setLoading
            })
            
            if (error) {
                Alert.alert('BRD | Error', error.toString());
                return
            }
    
            if (response) {
                setCategories(response)
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (items.length === 0) {
            setInvoiceId(generateNumericId())
        }
    }, [items])

  return (
    <ScrollView >
        <SafeAreaView style={styleNewInvoice.mainInvoice}>
            <View style={styleNewInvoice.decorationGradientLeft}></View>
            <View style={styleNewInvoice.mainInvoiceContainer}>
                <View style={{ width: '100%' }}>
                    <TextWithColor color="rgb(39, 39, 39)" style={{ fontSize: 20 }}>New Invoice #{invoiceId}</TextWithColor>
                    <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12, marginTop: 5 }}>Create a new invoice for you client. You can spicify the invoice details and add items to the invoice.</TextWithColor>
                </View>

                <View style={{ marginTop: 20, width: '100%', gap: 20 }}>
                    <View>
                        <TextWithColor color="rgb(231, 173, 63)" style={{ fontSize: 20 }}>Personal Information</TextWithColor>
                        <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12 }}>Details of the invoice.</TextWithColor>
                    </View>

                    <View style={{ gap: 5 }}>
                        <TextWithColor>To</TextWithColor>
                        <TextInput placeholder="Stella Rose Benett"
                        style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1 }}
                        placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                        onChangeText={(text) => setInvoiceData({...invoiceData, to: text })}
                        />
                    </View>

                    <View style={{ gap: 5 }}>
                        <TextWithColor>Category</TextWithColor>
                        {
                            categories.length > 0 ?
                            <Picker
                            selectedValue={invoiceData.category_id}
                            onValueChange={(text) => setInvoiceData({...invoiceData, category_id: text })}
                            >
                                {
                                    categories.map((category: CategoryType) => (
                                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                                    ))
                                }
                            </Picker>
                            : null
                        }
                        <View style={{ height: 1, backgroundColor: 'rgba(99, 99, 99, 0.25)' }}></View>
                    </View>

                    <View style={{ gap: 1 }}>
                        <TextWithColor>Description</TextWithColor>
                        <TextInput placeholder="Description of the Invoice, talking about what kind of service you are providing." numberOfLines={4} multiline 
                        style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1, minHeight: 50 }}
                        placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                        onChangeText={(text) => {text ? setInvoiceData({ ...invoiceData, description: text }) : setInvoiceData({ ...invoiceData, description: '' }) }}
                        />
                    </View>

                    <View>
                        <TextWithColor color="rgb(231, 173, 63)" style={{ fontSize: 20 }}>Items Invoice</TextWithColor>
                        <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12 }}>Details of the items in the invoice.</TextWithColor>
                    </View>

                    <View style={{ gap: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <View style={{ width: 165 }}>
                            <TextWithColor>Item name</TextWithColor>
                            <TextInput placeholder="Item..."
                            style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1, width: '100%' }}
                            placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                            value={item.product}
                            onChangeText={(text) => {text ? setItem({ ...item, product: text }) : setItem({ ...item, product: '' })}}
                            />
                        </View>

                        <View style={{ width: 120 }}>
                            <TextWithColor>Quantity</TextWithColor>
                            <TextInput placeholder="Quantity..." 
                            style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1, width: '100%'}}
                            placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                            keyboardType="numeric"
                            value={item.quantity.toString()}
                            onChangeText={(text) => {text ? setItem({ ...item, quantity: text }) : setItem({ ...item, quantity: '' })}}
                            />
                        </View>

                        <View style={{ width: 165 }}>
                            <TextWithColor>Amount</TextWithColor>
                            <TextInput placeholder="$0.00" 
                            style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1, width: '100%' }}
                            placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                            value={item.unitPrice.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => {setItem({ ...item, unitPrice: text })}}
                            />
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120 }}>
                            <TouchableOpacity style={styleNewInvoice.buttonAddItem} 
                            onPress={() => {
                                handleAddNewItem({ item, items, setItem, setItems, Alert })
                            }}
                            >
                                <TextWithColor>Add</TextWithColor>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TextWithColor color="rgb(231, 173, 63)" style={{ fontSize: 20 }}>Discount or Tax</TextWithColor>
                        <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12 }}>You can add a percent of discount or tax.</TextWithColor>
                    </View>

                    <View style={{ gap: 15 }}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity
                            style={{ backgroundColor: isDiscountOrTax.name === 'Discount' ? 'rgba(238, 186, 42, 0.72)' : 'rgba(216, 216, 216, 0.72)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 }}
                            onPress={() => setIsDiscountOrTax({ name: 'Discount', value: isDiscountOrTax.value })}
                            >
                                <TextWithColor>Discount</TextWithColor>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{ backgroundColor: isDiscountOrTax.name === 'Tax' ? 'rgba(238, 186, 42, 0.72)' : 'rgba(216, 216, 216, 0.72)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 }}
                            onPress={() => setIsDiscountOrTax({ name: 'Tax', value: isDiscountOrTax.value })}
                            >
                                <TextWithColor>Tax</TextWithColor>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TextWithColor>Discount or Tax</TextWithColor>
                            <TextInput placeholder="Enter discount or tax in percentage." 
                            keyboardType="numeric"
                            style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1 }}
                            placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                            onChangeText={(text) => text ? setIsDiscountOrTax({ ...isDiscountOrTax, value: parseFloat(text) }) : setIsDiscountOrTax({ ...isDiscountOrTax, value: 0 })}
                            />
                        </View>
                    </View>
                    
                    {
                        loading ? <ActivityIndicator size="large" color="rgb(231, 173, 63)" /> :
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity style={styleNewInvoice.buttonCreateInvoice}
                            onPress={() => {handlePress()}}>
                            <TextWithColor>Create</TextWithColor>
                        </TouchableOpacity>

                        <TouchableOpacity style={styleNewInvoice.buttonCancelInvoice} 
                            onPress={() => {navigation.goBack()}}>
                            <TextWithColor color="rgba(238, 237, 237, 0.93)">Cancel</TextWithColor>
                        </TouchableOpacity>
                    </View>
                    }

                    <View>
                        <TextWithColor color="rgb(231, 173, 63)" style={{ fontSize: 20 }}>Invoice Preview</TextWithColor>
                        <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12 }}>Items in the invoice. You can delete them, and add new ones, and get the total amount.</TextWithColor>
                        
                        <View style={{ width: '100%', marginBottom: 30, marginTop: 15 }}>
                            { items.length > 0 ?
                                items.map((item, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    onPress={() => {items.splice(index, 1); setItems([...items])}}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                                            <TextWithColor><TextWithColor color="rgba(199, 141, 33, 0.76)">x{item.quantity}</TextWithColor> {item.product}</TextWithColor>
                                            <TextWithColor>${parseInt(item.quantity.toString()) * parseFloat(item.unitPrice.toString())}</TextWithColor>
                                        </View>
                                    </TouchableOpacity>
                                )) 
                                
                                : 
                                <TextWithColor color="rgba(255, 84, 84, 0.62)" style={{ backgroundColor: 'rgba(255, 84, 84, 0.12)', padding: 10, borderRadius: 10 }}>There aren't any items yet.</TextWithColor>
                            }
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end', marginTop: 10 }}>
                                <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <TextWithColor color="rgba(36, 35, 35, 0.76)">Subtotal</TextWithColor>
                                    <TextWithColor color="rgba(22, 22, 22, 0.83)" style={{ fontSize: 20, fontWeight: 'bold' }}>${subtotal}</TextWithColor>
                                </View>

                                <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row', alignItems: 'flex-end' }}>
                                    {
                                        isDiscountOrTax.name === 'Discount' ?
                                        <>
                                            <TextWithColor color="rgba(36, 35, 35, 0.76)">{isDiscountOrTax.value}% Discount </TextWithColor>
                                            <TextWithColor color="rgb(221, 90, 90)" style={{ fontSize: 20, fontWeight: 'bold' }}>-${(subtotal * (isDiscountOrTax.value / 100)).toFixed(2)}</TextWithColor>
                                        </> : isDiscountOrTax.name === 'Tax' ?
                                        <>
                                            <TextWithColor color="rgba(36, 35, 35, 0.76)">{isDiscountOrTax.value}% Taxes </TextWithColor>
                                            <TextWithColor color="rgb(90, 221, 123)" style={{ fontSize: 20, fontWeight: 'bold' }}>+${(subtotal * (isDiscountOrTax.value / 100)).toFixed(2)}</TextWithColor>
                                        </> 
                                        :
                                        <>
                                            <TextWithColor color="rgba(36, 35, 35, 0.76)">{isDiscountOrTax.value}% Taxes </TextWithColor>
                                            <TextWithColor color="rgb(247, 186, 56)" style={{ fontSize: 20, fontWeight: 'bold' }}>${(subtotal * (isDiscountOrTax.value / 100)).toFixed(2)}</TextWithColor>
                                        </>
                                        
                                    }
                                </View>

                                <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <TextWithColor color="rgba(199, 141, 33, 0.76)" style={{ fontSize: 18, fontWeight: 'bold', transform: [{ translateY: -5 }] }}>Total</TextWithColor>
                                    <TextWithColor color="rgba(22, 22, 22, 0.83)" style={{ fontSize: 28, fontWeight: 'bold' }}>${total.toFixed(2)}</TextWithColor>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>


            </View>
        </SafeAreaView>
    </ScrollView>
     );
}

const styleNewInvoice = StyleSheet.create({
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
    width: '85%',
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
    }
});
