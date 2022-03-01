import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

/*date-fns */
import { parseISO, formatDistanceToNow } from 'date-fns'

/*REDUX */
import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    incrementByAmount,
    selectCount,
} from '../src/features/counter/counterSlice';

/*Components*/
import { PostAuthor } from '../src/features/posts/postAuthor';
import { ReactionButtons } from '../components/ReactionButtons';

import { PostsList } from '../components/PostsList';

/*selector functions*/
import { selectAllPosts, fetchPosts } from '../src/features/posts/postsSlice';

import { postAdded } from '../src/features/posts/postsSlice';
import { addNewPost } from '../src/features/posts/postsSlice';



const Counter = ({ route, navigation }) => {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()

    const incrementPress = () => {
        dispatch(increment())
    }

    const decrementPress = () => {
        dispatch(decrement())
    }


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>{count}</Text>
            <Button title="plus" onPress={() => incrementPress()} />
            <Button title="minus" onPress={() => decrementPress()} />
        </View>
    );
}
export default function Screen({ route, navigation }) {

    return (
        <View style={styles.container}>
            <Counter />
            <PostsList navigation={navigation} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
