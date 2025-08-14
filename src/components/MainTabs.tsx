import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import MovieListScreen from "../screens/MovieListScreen";
import MapScreen from "../screens/MapScreen";
import SettingsScreen from "../screens/SettingsScreen";

//https://icons.expo.fyi/Index
//<MaterialIcons name="movie" size={24} color="black" />

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#EB4435",
            tabBarInactiveTintColor: "#999",
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIcon: ({ color, size }) => {
                let iconName: any;
                switch (route.name) {
                    case "MovieListScreen":
                        iconName = "movie";
                        break;
                    case "MapScreen":
                        iconName = "map";
                        break;
                    case "SettingsScreen":
                        iconName = "settings";
                        break;
                    default:
                        iconName = "help";
                }
                return <MaterialIcons name={iconName} size={size} color={color} />;
            }
        })}>
            <Tab.Screen
                name="MovieListScreen"
                component={MovieListScreen}
                options={{ title: "Filmes" }}
            />
            <Tab.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ title: "Mapa" }}
            />
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ title: "Ajustes" }}
            />
        </Tab.Navigator>
    )
}

