import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

/*REDUX*/
import { useSelector, useDispatch } from 'react-redux'

/*REDUCERS FUNCTIONS*/
import { postUpdated } from '../src/features/posts/postsSlice';

export const EditPostForm = (props) => {
    /*consts*/
    const postId = props.postId
    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )
    const [name, setName] = useState(post.name)
    const [content, setContent] = useState(post.content)
    const dispatch = useDispatch()

    /*functions*/
    const onSavePost = (postId,name,content) => {
        dispatch(
            postUpdated({id:postId,name,content})
        )
    }
    
    return (
        <View>
            <Text>Edit Your Post no. {postId}</Text>

            <Text>Inputs:</Text>
            <TextInput
                onChangeText={setName}
                placeholder="set new name here"
                value={name}
                style={{backgroundColor:'#9c9c9c',margin:5,padding:5}}
            />
            <TextInput
                onChangeText={setContent}
                placeholder="set new content here"
                value={content}
                style={{backgroundColor:'#9c9c9c',margin:5,padding:5}}
            />
            <Button title="save" onPress={() => onSavePost(postId,name,content)} />
        </View>
    )
}