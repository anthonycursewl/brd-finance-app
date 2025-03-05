import { INavGlobal } from "@/app/shared/interfaces/INavGloba";
import { Image, FlatList, View, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { CardInvoiceDetails } from "../components/CardInvoiceList";

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

// Styling
import { styleInvoicesCategory } from "./styleShowCategories";

interface CategoryParams {
  item: CategoryType;
}

interface Item {
  id: string;
  product: string;
  unitPrice: number;
  quantity: number;
  [key: string]: any;
}

interface Users {
  email: string;
  name: string;
}

export interface DiscountInfo {
  id?: string;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<DiscountInfo[]>([]);

  const route = useRoute();
  const { item } = route.params as CategoryParams;

  const getInvoicesByCategory = async () => {
    const { response, error } = await useFetch({
      options: {
        url: `${BRD_API_URL}/invoice/find/category/${item.id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${await get("AuthToken").then((res) => res?.token)}`,
        },
        body: null,
      },
      setLoading: setLoading,
    });

    if (error) {
      Alert.alert("BRD | Error", error.toString());
      return;
    }

    if (response) {
      console.log(response);
      setInvoices(response);
    }
  };

  
  useEffect(() => {
    getInvoicesByCategory();
  }, []);

  return (
    <SafeAreaView style={styleInvoicesCategory.mainInvoice}>
      <View style={styleInvoicesCategory.decorationGradientLeft}></View>

      <View style={styleInvoicesCategory.mainInvoiceContainer}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: item.icon }}
              style={{ width: 30, height: 30 }}
            />
            <TextWithColor
              color="rgb(223, 161, 74)"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {item.name}
            </TextWithColor>
          </View>
          <TextWithColor style={{ fontSize: 12, color: "rgb(116, 116, 116)" }}>
            Category
          </TextWithColor>
        </View>

        {loading ? (
          <ActivityIndicator size={"large"} color={"rgb(255, 203, 106)"} />
        ) : (

          <FlatList
            data={invoices}
            renderItem={({ item: inv }: { item: DiscountInfo }) => (
              <CardInvoiceDetails inv={inv} item={item} navigation={{ navigation: navigation }} />
            )}
          />

        )}
      </View>
    </SafeAreaView>
  );
}
