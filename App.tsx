import { Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 

import MainTabs from './src/components/MainTabs';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import MovieFormScreen from './src/screens/MovieFormScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <NavigationContainer
        theme={{
          ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'white', primary: '#EB4435' }
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MovieDetailsScreen"
            component={MovieDetailsScreen}
            options={({ navigation, route }) => ({
              headerBackButtonDisplayMode: 'minimal',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MovieFormScreen', { movie: route.params?.movie })}
                >
                  <Text style={{ color: '#eb4435', fontSize: 18 }}>
                    Editar
                  </Text>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name="MovieFormScreen"
            component={MovieFormScreen}
            options={({ navigation }) => ({
              headerBackButtonDisplayMode: 'minimal',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.popToTop()}>
                  <Text style={{ color: '#eb4435', fontSize: 18 }}>
                    Voltar ao início
                  </Text>
                </TouchableOpacity>
              )
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
