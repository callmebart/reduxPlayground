import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import { useSelector } from "react-redux";

export const SinglePostPage = ({ match }) => {

    const { postId } = match.params

    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )

    return (
        <View>
            {!post
                ? <Text>PostNotFound</Text>
                : <Text>post</Text>
            }

        </View>


    )
}