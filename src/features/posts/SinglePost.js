import React, { useState } from 'react'
import { StyleSheet, Text, View,Button } from 'react-native';

import { useSelector } from "react-redux";

/*Components*/
import { EditPostForm } from '../../../components/EditPostForm';

/*selector functions*/
import { selectPostById } from './postsSlice';

/*RTK QUERY HOOKS*/
import { useGetPostQuery,useEditPostMutation } from '../api/apiSlice';

export const SinglePostPage = ({ route, navigation }) => {

    const { postId } = route.params
    const {
        data: postRTK,
        isFetching,
        isError,
        isSuccess
    } = useGetPostQuery(postId) //RTK query

    
    

    //old style 
    // const post = useSelector(state =>
    //     state.posts.find(post => post.id === postId)
    // )
    const post = useSelector(state => selectPostById(state, postId))

    return (
        <View>
            {!post
                ? <Text>PostNotFound</Text>
                : <View>
                    <Text>{post.content}</Text>
                    <EditPostForm postId={postId} />
                </View>
            }
             <Text style={{margin:10,fontWeight:'bold'}}>RTK QUERY GET POST </Text>
            {isFetching ? <Text>Fetching..</Text> : <Text>not Fetching</Text>}
            {
                isSuccess ?
                    <View>
                        <Text>name:{postRTK.name}</Text>
                        <Text>content:{postRTK.content}</Text>
                    </View>
                    : <Text>not working</Text>                 
            }
           
        </View>
    )
}