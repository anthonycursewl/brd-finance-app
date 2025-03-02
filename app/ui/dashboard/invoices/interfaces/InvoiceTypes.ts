export interface ItemInvoice {
    name: string;
    quantity: string | number;
    amount: string | number;
    subtotal: number;
}

export interface InvoiceData {
    to: string;
    from: string;
    category: string;
    description: string;
    items: ItemInvoice[];
    total: number;
    created_at: string;
    tax: number;
    discount: number;
}

export interface DiscountOrTax {
    name: string;
    value: number;
}

export interface IAddNewItem {
    item: ItemInvoice
    setItems: (items: ItemInvoice[]) => void
    setItem: (item: ItemInvoice) => void
    items: ItemInvoice[],
    Alert: any
}