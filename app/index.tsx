// Global State using Zustand
import { useGlobalState } from "./shared/GlobalState/GlobalState";

// hooks
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useFonts } from "expo-font";

// Screens
import { SplashScreen } from "expo-router";
import Login from "./ui/auth/login/login";
import Main from "./ui/dashboard/main/main";
import NewInvoice from "./ui/dashboard/invoices/NewInvoice";
import NewCategory from "./ui/dashboard/categories/NewCategory";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded] = useFonts({
    OnestRegular: require("../assets/fonts/Onest-Regular.ttf"),
  });
  const { IsAuthenticated } = useGlobalState();

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

       {/* SCREEN AUTH*/} 
        <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
        />

      {/* SCREEN DASHBOARD*/} 
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />

      {/* SCREEN NEW INVOICE*/}
      <Stack.Screen
        name="NewInvoice"
        component={NewInvoice}
        options={{ headerShown: false }}
      />

      {/* SCREEN NEW CATEGORY */}
      <Stack.Screen
        name="NewCategory"
        component={NewCategory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
