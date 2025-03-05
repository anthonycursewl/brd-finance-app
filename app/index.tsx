// lazy loading
import { lazy } from "react";
import { Suspense } from "react";

// hooks
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useFonts } from "expo-font";

// Screens
import { SplashScreen } from "expo-router";
import ShowByCategory from "./ui/dashboard/invoices/ShowByCategory/ShowByCategory";
const Login = lazy(() => import("./ui/auth/login/login"));
const Main = lazy(() => import("./ui/dashboard/main/main"));
const NewInvoice = lazy(() => import("./ui/dashboard/invoices/NewInvoice"));
const NewCategory = lazy(() => import("./ui/dashboard/categories/NewCategory"));
const ShowCategories = lazy(() => import("./ui/dashboard/categories/CategoriesList/ShowCategories"))

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded] = useFonts({
    OnestRegular: require("../assets/fonts/Onest-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Suspense fallback={null}>
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
        {/* SCREEN SHOW CATEGORIES */}
        <Stack.Screen
          name="ShowCategories"
          component={ShowCategories}
          options={{ headerShown: false }}
        />
        {/* SCREEN SHOW CATEGORIES */}
        <Stack.Screen
          name="ShowByCategory"
          component={ShowByCategory}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </Suspense>
  );
}
