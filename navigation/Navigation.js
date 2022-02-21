import * as React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*Screens*/
import HomeScreen from '../screens/HomeScreen';
import { SinglePostPage } from '../src/features/posts/SinglePost';


const Stack = createNativeStackNavigator()

export default function Navigation({ route, navigation }){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="SinglePostPage" component={SinglePostPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}