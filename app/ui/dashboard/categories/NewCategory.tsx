// components
import { SafeAreaView, StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";

// hooks
import { useState } from "react";

// Interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGloba";


export default function NewCategory({ navigation }: INavGlobal) {

const icons = [require('@/assets/images/food-cat.png'), require('@/assets/images/copy-cat.png'), require('@/assets/images/home-cat.png'), require('@/assets/images/transport-cat.png'),
    require('@/assets/images/new-cat.png'), require('@/assets/images/entertainment-cat.png'), require('@/assets/images/tools-cat.png'), require('@/assets/images/new-cat.png'),
    require('@/assets/images/winner-cat.png'), require('@/assets/images/important-cat.png'), require('@/assets/images/task-cat.png'), require('@/assets/images/reminder-cat.png'),
    require('@/assets/images/diversity-cat.png'), require('@/assets/images/locate-cat.png'), require('@/assets/images/clothes-cat.png'), require('@/assets/images/libs-cat.png'),
    require('@/assets/images/stuff-cat.png'), require('@/assets/images/messages-cat.png'), require('@/assets/images/finance-cat.png'), require('@/assets/images/programming-cat.png'),
    require('@/assets/images/exchange-cat.png'), require('@/assets/images/other-cat.png')
]

  return (
    <ScrollView >
        <SafeAreaView style={styleNewCategory.mainInvoice}>
            <View style={styleNewCategory.decorationGradientLeft}></View>
            <View style={styleNewCategory.mainInvoiceContainer}>
                <View style={{ width: '100%' }}>
                    <TextWithColor color="rgb(39, 39, 39)" style={{ fontSize: 20 }}>New Category</TextWithColor>
                    <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12, marginTop: 5 }}>Create a new category to store your invoices! You can spicify category details and store the type of invoices you want to create. Then you can create the invoice.</TextWithColor>
                </View>

                <View style={{ marginTop: 20, width: '100%', gap: 20 }}>
                    <View>
                        <TextWithColor color="rgb(231, 173, 63)" style={{ fontSize: 20 }}>Creating a new category</TextWithColor>
                        <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12 }}>Details of the new category to store different invoices.</TextWithColor>
                    </View>

                    <View style={{ gap: 5 }}>
                        <TextWithColor>Name</TextWithColor>
                        <TextInput placeholder="Gym, Transport, Food, Health, etc."
                        style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1 }}
                        placeholderTextColor={'rgba(65, 65, 65, 0.25)'}

                        />
                    </View>

                    <View style={{ gap: 1 }}>
                        <TextWithColor>Description</TextWithColor>
                        <TextInput placeholder="Description of the category, talking about what it does." numberOfLines={4} multiline 
                        style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1, minHeight: 50 }}
                        placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                        />
                    </View>

                    <View style={{ gap: 1 }}>
                        <TextWithColor>Icons</TextWithColor>
                        <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12, marginTop: 5 }}>Select an icon to represent the category.</TextWithColor>
                        
                        <View style={styleNewCategory.iconsContainer}>
                            {
                                icons.map((icon, index) => (
                                    <Image source={icon} key={index} style={{ width: 38, height: 38 }} />
                                ))
                            }
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity style={styleNewCategory.buttonCreateInvoice}
                        onPress={() => {}}>
                            <TextWithColor>Create</TextWithColor>
                        </TouchableOpacity>

                        <TouchableOpacity style={styleNewCategory.buttonCancelInvoice} 
                        onPress={() => {navigation.goBack()}}>
                            <TextWithColor color="rgba(238, 237, 237, 0.93)">Cancel</TextWithColor>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    </ScrollView>
     );
}

const styleNewCategory = StyleSheet.create({
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
    },
    iconsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        borderColor: 'rgba(240, 140, 46, 0.49)',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    }
});
