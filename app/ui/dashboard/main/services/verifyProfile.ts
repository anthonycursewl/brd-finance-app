import { useFetch } from "@/app/shared/auth/services/useFetch";
import { get } from "@/app/shared/auth/services/useAuth";
import { User } from "@/app/shared/interfaces/IUser";
import { INavGlobal } from "@/app/shared/interfaces/INavGloba";

interface VerifyProps {
    setLoading: (loading: boolean) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User) => void;
    Alert: {
        alert: (title: string, message: string) => void
    }
    rt: INavGlobal
}

export const verify = async ({ setLoading, setIsAuthenticated, setUser, Alert, rt }: VerifyProps): Promise<void> => {
    const { response, error } = await useFetch({
        options: {
            url: 'http://192.168.101.69:3000/user/verify',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${await get('AuthToken').then(res => res?.token)}`
            }
        },
        setLoading: setLoading
    })

    if (error) {
        setIsAuthenticated(false)
        Alert.alert('BRD | Error', error.toString());
        return rt.navigation.navigate('Login')
    }

    if (response) {
        console.log(response)
        setIsAuthenticated(true)
        setUser(response)
    }
}