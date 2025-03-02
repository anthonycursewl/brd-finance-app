import { IAddNewItem } from "../interfaces/InvoiceTypes"

export const handleAddNewItem = ({ item, items, setItem, setItems, Alert }: IAddNewItem): void => {
    if (!item.name || !item.quantity || !item.amount) {
        return Alert.alert('BRD | ERROR','Please fill all the fields.')
    }

    if (parseFloat(item.amount.toString()) < 0 || parseFloat(item.quantity.toString()) < 0) {
        return Alert.alert('BRD | ERROR','Quantity and amount must be greater than 0.')
    }

    if (items.some((i) => i.name === item.name)) {
        return Alert.alert('BRD | ERROR', 'Item already exists.')
    }

    if (isNaN(parseFloat(item.amount.toString())) || isNaN(parseInt(item.quantity.toString()))) {
        return Alert.alert('BRD | ERROR', 'Quantity and amount must be numbers.')
    }

    let amount = parseFloat(item.amount.toString())
    let quantity = parseFloat(item.quantity.toString())
    const newItem = {
        name: item.name,
        quantity: quantity,
        amount: amount,
        subtotal: amount * quantity,
    }

    setItems([...items, newItem])
    setItem({ name: '', quantity: 0, amount: 0, subtotal: 0 })
}