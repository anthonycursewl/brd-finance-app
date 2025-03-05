export interface ItemInvoice {
    id: string;
    product: string;
    quantity: number | string;
    unitPrice: number | string;
}

export interface InvoiceData {
    id: string;
    to: string;
    from: string;
    category_id: string;
    description: string;
    items: ItemInvoice[];
    issuedAt: string;
    is_paid: boolean
    tax: number;
    discount: number;
}

export interface DiscountOrTax {
    name: string;
    value: number;
}

export interface IAddNewItem {
    item: ItemInvoice;
    setItems: (items: ItemInvoice[]) => void;
    setItem: (item: ItemInvoice) => void;
    items: ItemInvoice[];
    Alert: any;
}