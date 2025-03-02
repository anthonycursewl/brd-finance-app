import * as SecureStore from 'expo-secure-store'

export const save = async (token: string, name: string): Promise<void> => {
    try {
        await SecureStore.setItemAsync(name, token)
    } catch (error) {
        return console.log('error', error)
    }
}

export const get = async (name: string): Promise<{ token: string } | undefined> => {
    try {
        const token = await SecureStore.getItemAsync(name);
        if (!token) return { token: '' };
        return { token: token || '' };
    } catch (error) {
        console.error('Error getting token:', error);
    }
};

export const removeToken = async (name: string): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(name);
    } catch (error) {
        console.error('Error removing token:', error);
    }
};
