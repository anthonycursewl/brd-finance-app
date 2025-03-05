import { generateNumericId } from "@/app/config/services/generatorIDs"
import { IAddNewItem } from "../interfaces/InvoiceTypes"

export const handleAddNewItem = ({ item, items, setItem, setItems, Alert }: IAddNewItem): void => {
    if (!item.product || !item.quantity || !item.unitPrice) {
        return Alert.alert('BRD | ERROR','Please fill all the fields.')
    }

    if (parseFloat(item.unitPrice.toString()) < 0 || parseFloat(item.quantity.toString()) < 0) {
        return Alert.alert('BRD | ERROR','Quantity and amount must be greater than 0.')
    }

    if (items.some((i) => i.product === item.product)) {
        return Alert.alert('BRD | ERROR', 'Item already exists.')
    }

    if (isNaN(parseFloat(item.unitPrice.toString())) || isNaN(parseInt(item.quantity.toString()))) {
        return Alert.alert('BRD | ERROR', 'Quantity and amount must be numbers.')
    }

    let unitPrice = parseFloat(item.unitPrice.toString())
    let quantity = parseFloat(item.quantity.toString())
    const newItem = {
        id: generateNumericId(),
        product: item.product,
        quantity: quantity,
        unitPrice: unitPrice,
    }

    setItems([...items, newItem])
    setItem({ product: '', quantity: '', unitPrice: '', id: ''})
}