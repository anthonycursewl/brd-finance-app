// components
import { SafeAreaView, StyleSheet, Alert, Image, ActivityIndicator, View, FlatList, TouchableOpacity } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";

// hooks
import { useEffect, useState } from "react";

// interfaces
import { CategoryType } from "@/app/shared/interfaces/ICategory";

// Interfaces
import { INavGlobal } from "@/app/shared/interfaces/INavGloba";

// Constants
import { iconsWithIds } from "@/app/shared/constants/iconsCategories";

// Services
import { useFetch } from "@/app/shared/auth/services/useFetch";
import { get } from "@/app/shared/auth/services/useAuth";
import { BRD_API_URL } from "@/app/config/breadriuss.config";
import { useGlobalState } from "@/app/shared/GlobalState/GlobalState";


export default function ShowCategories({ navigation }: INavGlobal) {
    const [loading, setLoading] = useState(false);
    const { user, categories, setCategories } = useGlobalState()
    const [icons, setIcons] = useState<string[]>()

    const handleGetData = async () => {
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

    useEffect(() => {
        handleGetData()
    }, [])

    useEffect(() => {
        console.log(categories)
    }, [])

    const CardCategory = ({ item }: { item: CategoryType }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('ShowByCategory', { item: item })
            }
            }>
                <View style={styleCardCategory.cardCategory}>
                    <View style={styleCardCategory.cardCategoryContainer}>
                        <Image style={{ width: 35, height: 35 }} source={{ uri: item.icon }}/>
                        <TextWithColor color="rgb(223, 161, 74)">{item.name}</TextWithColor>
                        <TextWithColor color="rgb(223, 161, 74)">{new Date(item.created_at).toISOString().split('T')[0]}</TextWithColor>
                    </View>

                    <View>
                        <TextWithColor color="rgb(224, 167, 101)">{0 + 1}</TextWithColor>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

  return (
        <SafeAreaView style={styleShowCategories.mainInvoice}>
            <View style={styleShowCategories.decorationGradientLeft}></View>
            <View style={styleShowCategories.mainInvoiceContainer}>

                <View style={{ width: '100%' }}>
                    <TextWithColor color="rgb(39, 39, 39)" style={{ fontSize: 20 }}>Categories</TextWithColor>
                    <TextWithColor color="rgba(99, 99, 99, 0.62)" style={{ fontSize: 12, marginTop: 5 }}>Categories you've created are listed here. You can modify them or set as deleted.</TextWithColor>
                </View>

                <FlatList data={categories} renderItem={({ item }) => 
                    <CardCategory item={item} />
                }/>

            </View>
        </SafeAreaView>
     );
}

const styleShowCategories = StyleSheet.create({
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
    backgroundColor: 'rgba(255, 188, 100, 0.72)',
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

const styleCardCategory = StyleSheet.create({
    cardCategory: {
        backgroundColor: 'rgb(252, 231, 193)',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    cardCategoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    }
})
