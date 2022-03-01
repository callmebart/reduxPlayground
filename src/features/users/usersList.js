import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Text, View, TouchableOpacity } from 'react-native';

export const UsersList = ({ route, navigation }) => {
    const users = useSelector(selectAllUsers)

    const showUser = (id) => {
        navigation.navigate('UserPage', {
            userId: id
        })
    }

    const renderUsers = users.map(user => {
        return (
            <TouchableOpacity onPress={() => showUser(user.id)} key={user.id} style={{ margin: 10 }}>
                <Text>{user.name}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <View>
            {renderUsers}
        </View>
    )
}