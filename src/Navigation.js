import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import UserListScreen from './screens/UserListScreen';
import UserDetailScreen from './screens/UserDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='UserList'>
                <Stack.Screen name='UserList' component={UserListScreen} options={{ title: "Users List" }} />
                <Stack.Screen name='UserDetail' component={UserDetailScreen} options={{ title: "User's Detail" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
