
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import TaskScreen from './src/screens/TaskScreen';
import AIChatScreen from './src/screens/AIChatScreen';
import ResourceScreen from './src/screens/ResourceScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200EE' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CampusMate' }} />
        <Stack.Screen name="Tasks" component={TaskScreen} options={{ title: 'Tasks & Deadlines' }} />
        <Stack.Screen name="AIChat" component={AIChatScreen} options={{ title: 'AI Assistant' }} />
        <Stack.Screen name="Resources" component={ResourceScreen} options={{ title: 'Study Resources' }} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
