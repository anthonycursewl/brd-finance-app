// Components
import TextWithColor from "@/app/shared/components/TextWithColor";
import { View, Image, TouchableOpacity } from "react-native";

// Interfaces
import { DiscountInfo } from "../ShowByCategory/ShowByCategory";

// Styling
import { styleInvoicesCategory } from "../ShowByCategory/styleShowCategories";

// Services
import { parseDate } from "@/app/config/services/parserDate";
import { INavGlobal } from "@/app/shared/interfaces/INavGloba";

interface CardInvoiceDetailsProps {
    inv: DiscountInfo;
    item: any
    navigation: INavGlobal
}

export const CardInvoiceDetails = ({ inv, item, navigation }: CardInvoiceDetailsProps) => {
    let subtotal = inv.items.map((item) => item.quantity * item.unitPrice).reduce((a, b) => a + b, 0);
    const cal = subtotal * (parseFloat(inv.type_amount.toString()) / 100);
    const total_final = inv.type === "discount" ? subtotal - cal : subtotal + cal;
    const discountOrTax = inv.type === "discount" ? `-$${cal.toFixed(2)}` : `+$${cal.toFixed(2)}`;

    // Icons
    const paidIcon = require("@/assets/images/is_paid_icon.png");
    const unpaidIcon = require("@/assets/images/is_unpaid_icon.png");

    return (
      <View style={styleInvoicesCategory.cardInvoice}>
        <View style={styleInvoicesCategory.cardInvoiceContainer}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TextWithColor style={{ fontSize: 30, fontWeight: "bold" }}>
              ${total_final.toFixed(2)}
            </TextWithColor>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {inv.type === "discount" ? (
                <>
                  <TextWithColor color="rgba(36, 35, 35, 0.76)">
                    {inv.type_amount}% Discount{" "}
                  </TextWithColor>
                  <TextWithColor
                    color="rgb(221, 90, 90)"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    {discountOrTax}
                  </TextWithColor>
                </>
              ) : inv.type === "tax" ? (
                <>
                  <TextWithColor color="rgba(36, 35, 35, 0.76)">
                    {inv.type_amount}% Taxes{" "}
                  </TextWithColor>
                  <TextWithColor
                    color="rgb(90, 221, 123)"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    {discountOrTax}
                  </TextWithColor>
                </>
              ) : (
                <>
                  <TextWithColor color="rgba(36, 35, 35, 0.76)">
                    {inv.type_amount}%{" "}
                  </TextWithColor>
                  <TextWithColor
                    color="rgb(247, 186, 56)"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    ${0.0}
                  </TextWithColor>
                </>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 4,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextWithColor
                style={{ fontSize: 13, color: "rgb(116, 116, 116)" }}
              >
                Subtotal
              </TextWithColor>
              <TextWithColor style={{ fontSize: 18, fontWeight: "bold" }}>
                ${subtotal.toFixed(2)}
              </TextWithColor>
            </View>
          </View>

          <View style={styleInvoicesCategory.cardInvoiceHeader}>
            <View style={{ gap: 4 }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 18, height: 18 }}
                  source={require("@/assets/images/icon_invoice_to.png")}
                />
                <TextWithColor
                  color="rgba(153, 126, 226, 0.7)"
                  style={{ fontSize: 13 }}
                >
                  Invoice to
                </TextWithColor>
              </View>
              <TextWithColor color="rgb(82, 82, 82)" style={{ fontSize: 15 }}>
                {inv.to}
              </TextWithColor>
            </View>

            <TextWithColor color="rgb(116, 116, 116)" style={{ fontSize: 13 }}>
              {parseDate(inv.issuedAt)}
            </TextWithColor>
          </View>

          <View style={styleInvoicesCategory.cardInvoiceBody}>

            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("@/assets/images/icon_description.png")}
                />
                <TextWithColor
                  color="rgba(153, 126, 226, 0.7)"
                  style={{ fontSize: 12 }}
                >
                  Description
                </TextWithColor>
              </View>
              <TextWithColor color="rgb(82, 82, 82)" style={{ fontSize: 14 }}>
                {inv.description}
              </TextWithColor>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', gap: 5, alignContent: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styleInvoicesCategory.buttonCreateInvoice}
                onPress={() => navigation.navigation.navigate('InvoiceDetails', { invoice: inv })}
                >
                    <TextWithColor color="rgba(238, 237, 237, 0.93)">View Invoice</TextWithColor>
                </TouchableOpacity>
                <TouchableOpacity style={styleInvoicesCategory.buttonCancelInvoice}>
                    <TextWithColor color="rgb(252, 244, 244)">Delete</TextWithColor>
                </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
  };