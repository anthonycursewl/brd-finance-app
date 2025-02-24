import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './ui/auth/login/login';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
// hooks
import { useEffect } from 'react';
import Main from './ui/dashboard/main/main';
import NewInvoice from './ui/dashboard/invoices/NewInvoice';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded] = useFonts({
    OnestRegular: require('../assets/fonts/Onest-Regular.ttf'),
  })

  useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
      <Stack.Screen name="NewInvoice" component={NewInvoice} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
