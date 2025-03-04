import { create } from 'zustand'
// Interfaces
import { User } from '../interfaces/IUser'
import { ItemInvoice } from '@/app/ui/dashboard/invoices/interfaces/InvoiceTypes'
import { CategoryType } from '../interfaces/ICategory'


interface IGlobalState {
    user: User,
    setUser: (user: User) => void,
    IsAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    item: ItemInvoice,
    setItem: (item: ItemInvoice) => void,
    items: ItemInvoice[],
    setItems: (items: ItemInvoice[]) => void,
    categories: CategoryType[],
    setCategories: (categories: CategoryType[]) => void

}

export const useGlobalState = create<IGlobalState>((set) => ({
    user: { email: '', id: '', name: '', username: '', type: '', created_at: new Date(), bought_at: new Date() },
    setUser: (user: User) => set({ user }),
    IsAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set({ IsAuthenticated: isAuthenticated }),
    item: { name: '', quantity: '', amount: '', subtotal: 0 },
    setItem: (item: ItemInvoice) => set({ item }),
    items: [],
    setItems: (items: ItemInvoice[]) => set({ items }),
    categories: [],
    setCategories: (categories: CategoryType[]) => set({ categories }),
}))