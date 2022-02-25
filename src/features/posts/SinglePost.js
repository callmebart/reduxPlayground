import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from "react-redux";

/*Components*/
import { EditPostForm } from '../../../components/EditPostForm';

/*selector functions*/
import { selectPostById } from './postsSlice';

export const SinglePostPage = ({ route, navigation }) => {

    const { postId } = route.params
    
    //old style 
    // const post = useSelector(state =>
    //     state.posts.find(post => post.id === postId)
    // )
    const post = useSelector(state => selectPostById(state,postId))

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