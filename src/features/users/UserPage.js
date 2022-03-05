import React, { useMemo } from "react";
import { FlatList, Text, View, Button } from 'react-native';

/*REDUX */
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

/*Redux Selectors*/
import { selectAllPosts, selectPostByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";
import { parseISO, formatDistanceToNow } from 'date-fns'

import { PostAuthor } from "../posts/postAuthor";
import { ReactionButtons } from "../../../components/ReactionButtons";

/*RTK HOOKS */
import { useGetPostsQuery } from "../api/apiSlice";


export const UserPage = ({ route, navigation }) => {

    const userId = route.params.userId
    const user = useSelector(state => selectUserById(state, userId))
    // const postsForUser = useSelector(state => {
    //     const allPosts = useSelector(selectAllPosts)
    //     return allPosts.filter(post => post.user === userId)
    // })

    //more efficient 
    const postsForUser = useSelector(state => selectPostByUser(state, userId))
    console.log(postsForUser)


    /*Getting from cache using RTK */
    const selectPostsForUserRTK = useMemo(() => {
        const emptyArry = []
        //return unique selector for this page

        return createSelector(
            res => res.data,
            (res, userId) => userId,
            (data, userId) => data?.filter(post => post.user === userId) ?? emptyArry
        )
    })

    const { postsForUserRTK } = useGetPostsQuery(undefined, {
        selectFromResult: result => ({
            // We can optionally include the other metadata fields from the result here
            ...result,
            //that field includes filtered list of posts
            postsForUserRTK: selectPostsForUserRTK(result, userId)
        })
    })




    const TimeAgo = (timestamp) => {
        let timeAgo = ''
        if (timestamp) {
            const date = parseISO(timestamp)
            const timePeriod = formatDistanceToNow(date)
            timeAgo = timePeriod
        }
        return timeAgo;
    }
    const goToPostPage = (post) => {
        navigation.navigate('SinglePostPage', {
            postId: post.id
        })
    }

    const renderPosts = ({ item, index }) => {
        const timeAgoRender = TimeAgo(item.date)

        return (
            <View key={item.id} style={{ borderWidth: 1, borderRadius: 5, margin: 5, width: 300, padding: 5 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
                <Text >{item.content}</Text>
                {item.user ?
                    <PostAuthor userId={item.user} />
                    : <PostAuthor userId={''} />
                }
                <Text>
                    created: {timeAgoRender} ago
                </Text>
                <ReactionButtons post={item} />
                <Button title="See the Post" onPress={() => goToPostPage(item)} />

            </View>
        )


    }
    return (
        <View>
            <Text>{user.name}</Text>
            <FlatList
                data={postsForUser}
                renderItem={renderPosts}
                keyExtractor={item => item.id}
            />

            <Text>RTK POSTS</Text>
            <FlatList
                data={postsForUserRTK}
                renderItem={renderPosts}
                keyExtractor={item => item.id}
            />

        </View>
    )
}