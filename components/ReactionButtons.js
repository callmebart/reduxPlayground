import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

/*REDUX*/
import { useSelector, useDispatch } from 'react-redux'

/*Redux Func*/
import { reactionAdded } from '../src/features/posts/postsSlice';

/*RTK HOOKS*/
import { useAddReactionMutation } from '../src/features/api/apiSlice';

const reactionEmojis = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

//by using {post} instead of (props) dont have to write props.post
export const ReactionButtons = ({ post }) => {

    const [addReactionRTK] = useAddReactionMutation()

    const dispatch = useDispatch()
    const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => {

        return (
            // <TouchableOpacity
            //     key={name}
            //     onPress={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
            //     style={{ padding: 10 }}
            // >
            //     <Text>{emoji}{post.reactions[name]}</Text>
            // </TouchableOpacity>
            <TouchableOpacity
                key={name}
                onPress={() => addReactionRTK({ postId: post.id, reaction: name })}
                style={{ padding: 10 }}
            >
                <Text>{emoji}{post.reactions[name]}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <View style={{ flexDirection: 'row' }}>
            {reactionButtons}
        </View>
    )
}