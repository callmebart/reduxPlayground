import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import { useSelector } from "react-redux";

/*Components*/
import { EditPostForm } from '../../../components/EditPostForm';

export const SinglePostPage = ({ route, navigation }) => {

    const { postId } = route.params

    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )

    return (
        <View>
            {!post
                ? <Text>PostNotFound</Text>
                : <View>
                    <Text>{post.content}</Text>
                    <EditPostForm postId={postId} />
                </View>
            }

        </View>
    )
}