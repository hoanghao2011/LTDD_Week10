// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import API_Screen_01 from './components/API_Screen_01';
import API_Screen_02 from './components/API_Screen_02';
import API_Screen_03 from './components/API_Screen_03';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="API_Screen_01">
                    <Stack.Screen name="API_Screen_01" component={API_Screen_01} />
                    <Stack.Screen name="API_Screen_02" component={API_Screen_02} />
                    <Stack.Screen name="API_Screen_03" component={API_Screen_03} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
