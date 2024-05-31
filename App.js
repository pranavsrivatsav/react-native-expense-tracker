import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500
            },
            headerTintColor: 'white'
          }}>
            <Stack.Screen
              name="Home"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{
              presentation: "card"
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );

  function ExpensesOverview() {
    return (
      <Tabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              name={"add"}
              color={tintColor}
              size={28}
              containerStyle={{
                marginHorizontal: 12,
                marginTop: 12,
                marginBottom: 8,
              }}
              onPress={() => {
                navigation.navigate("ManageExpenses");
              }}
            />
          ),
        })}
      >
        <Tabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recents",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name="hourglass" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
