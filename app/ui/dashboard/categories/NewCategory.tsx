// components
import { SafeAreaView, StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";

// hooks
import { useState } from "react";

// Interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGloba";

// Constants
import { iconsWithIds } from "@/app/shared/constants/iconsCategories";
import { useFetch } from "@/app/shared/auth/services/useFetch";

// Services
import { get } from "@/app/shared/auth/services/useAuth";

interface CategoryType {
    id?: string;
    name: string;
    description: string;
    icon: string;
    user_id?: string;
    is_deleted?: boolean;
    created_at?: Date;
    pathIcon: string
}

export default function NewCategory({ navigation }: INavGlobal) {
    const [data, setData] = useState<CategoryType>({ name: '', description: '', icon: '', pathIcon: '' });
    const [loading, setLoading] = useState(false);

    const handleCreateNewCategory = async () => {
        if (!data.name || !data.description || !data.icon) {
            Alert.alert('BRD | Error', 'Please fill all the fields.');
            return
        }

        if (data.name.length > 200 || data.description.length > 200) {
            Alert.alert('BRD | Error', 'Name and description must be less than 200 characters.');
            return
        }

        const { response, error } = await useFetch({
            options: {
                url: 'http://192.168.101.69:3000/category/save',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${await get('AuthToken').then(res => res?.token)}`
                }
            },
            setLoading: setLoading
        })

        if (error) {
            Alert.alert('BRD | Error', error.toString());
            return
        }

        if (response) {
            Alert.alert('BRD | Success', 'Category created successfully.');
            setData({ name: '', description: '', icon: '', pathIcon: '' });
        }
    }

  return (
    <ScrollView>
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
                        onChangeText={(value) => setData({ ...data, name: value })}
                        value={data.name}
                        />
                    </View>

                    <View style={{ gap: 1 }}>
                        <TextWithColor>Description</TextWithColor>
                        <TextInput placeholder="Description of the category, talking about what it does." numberOfLines={4} multiline 
                        style={{ textAlign: 'left', borderBottomColor: 'rgba(99, 99, 99, 0.25)', borderBottomWidth: 1, minHeight: 50 }}
                        placeholderTextColor={'rgba(65, 65, 65, 0.25)'}
                        onChangeText={((text) => setData({ ...data, description: text }))}
                        value={data.description}
                        />
                    </View>

                    <View style={{ gap: 1 }}>
                        <TextWithColor>Icons</TextWithColor>
                        <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12, marginTop: 5 }}>Select an icon to represent the category.</TextWithColor>
                            
                        {data.icon &&
                            <Image source={iconsWithIds.find((icon) => icon.id === data.icon)?.icon} style={styleNewCategory.selectedIcon}/>
                        }

                        <View style={styleNewCategory.iconsContainer}>
                            {
                                iconsWithIds.map((icon, index) => (
                                    <TouchableOpacity onPress={() => {setData({ ...data, icon: icon.id, pathIcon: icon.path })}} key={index}>
                                        <Image source={icon.icon} style={{ width: 38, height: 38, borderBottomWidth: 2, borderColor: data.icon === icon.id ? 'rgb(245, 84, 84)' : 'transparent' }}/>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity style={styleNewCategory.buttonCreateInvoice}
                        onPress={() => {handleCreateNewCategory()}}>
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
    },
    selectedIcon: {
        width: 38,
        height: 38,
        marginTop: 12,
        filter: 'drop-shadow(4px 4px 4px rgba(26, 26, 24, 0.22))',
    }
});
