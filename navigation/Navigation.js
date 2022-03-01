import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*Screens*/
import HomeScreen from '../screens/HomeScreen';
import { SinglePostPage } from '../src/features/posts/SinglePost';
import { UserPage } from "../src/features/users/UserPage";
import { UsersList } from '../src/features/users/usersList';


const Stack = createNativeStackNavigator()

export default function Navigation({ route, navigation }) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SinglePostPage" component={SinglePostPage} />
                <Stack.Screen name="UserPage" component={UserPage} />
                <Stack.Screen name="UsersList" component={UsersList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}