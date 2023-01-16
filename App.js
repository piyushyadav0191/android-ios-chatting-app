import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomePage from "./screens/HomePage"
import AddChat from "./screens/AddChat"
import ChatScreen from './screens/ChatScreen';


const Stack = createNativeStackNavigator()
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyles: { color: 'white' },
  headerTintColor: 'white',
  headerTitleAlign: 'center'
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        <Stack.Screen name='AddChat' component={AddChat} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

