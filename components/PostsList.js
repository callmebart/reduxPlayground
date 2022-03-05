import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
/*date-fns */
import { parseISO, formatDistanceToNow } from 'date-fns'
/*REDUX */
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit';
/*Components*/
import { PostAuthor } from '../src/features/posts/postAuthor';
import { ReactionButtons } from '../components/ReactionButtons';
import { postAdded } from '../src/features/posts/postsSlice';
import { addNewPost } from '../src/features/posts/postsSlice';
/*selector functions*/
import { selectAllPosts, fetchPosts } from '../src/features/posts/postsSlice';
import { fetchNotifications, selectAllNotifications } from '../src/features/notifications/notificationsSlice';
/*RTK QUERY HOOKS*/
import { useAddNewPostMutation, useGetPostsQuery } from '../src/features/api/apiSlice';

export const PostsList = (props) => {

    const {
        data: postsRTK = [],
        isLoading,
        isFetching,
        isSuccess,
        IsError,
        error,
    } = useGetPostsQuery({
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })

   
    const [addNewPostRTK, {/*parameters like isLoading*/ }] = useAddNewPostMutation()
    /*NOte 
        we can add refeth parameter in the consts declaration in useGetPostsQuery
        and pass it to by button click onPress=()=>{refetch} => annoying
    */



    const sortedPosts = useMemo(() => {
        const sortedPosts = postsRTK.slice()
        // Sort posts in descending chronological order
        sortedPosts.reverse()
        return sortedPosts
    }, [postsRTK])


    const dispatch = useDispatch()
    const navigation = props.navigation

    const [userId, setUserId] = useState('');
    // const posts = useSelector(state => state.posts)
    const posts = useSelector(selectAllPosts)
    const users = useSelector(state => state.users)
    const name = 'new post with modified createslice';
    const nameRTK = 'new post created with RTK Querys';
    const contentRTK = 'egverything is working'
    const content = "my component doesnt have to worry about payload"
    //ordering posts 
    //const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const notifications = useSelector(selectAllNotifications)

    const postStatus = useSelector(state => state.posts.status)
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
        // dispatch(fetchNotifications())
    }, [])

    const addPost = async () => {
        // dispatch(postAdded(name, content, userId))
        await dispatch(addNewPost({ name, content, user: userId })).unwrap()
        setUserId('')
    }

    const addPostRTK = async () => {
        try {
            await addNewPostRTK({
                id: nanoid(),
                date: new Date(),
                nameRTK,
                contentRTK,
                user: userId,
                reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
            }).unwrap()
            setUserId('')
        } catch (err) {
            console.log("failed to add post: ", err)
        }
    }

    const goToPostPage = (post) => {
        navigation.navigate('SinglePostPage', {
            postId: post.id
        })
    }
    const showUsers = () => {
        navigation.navigate('UsersList', {
            userId: userId
        })
    }

    const selectUser = users.map(user => (
        <TouchableOpacity key={user.id} style={{ borderWidth: 1, borderRadius: 5, margin: 5, width: 200, padding: 5 }} onPress={() => setUserId(user.id)} >
            <Text>{user.name}</Text>
        </TouchableOpacity>
    ))

    const TimeAgo = (timestamp) => {
        let timeAgo = ''
        if (timestamp) {
            const date = parseISO(timestamp)
            const timePeriod = formatDistanceToNow(date)
            timeAgo = timePeriod
        }
        return timeAgo;
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

    const poststest = sortedPosts.map(test => (
        <TouchableOpacity key={test.id} style={{ borderWidth: 1, borderRadius: 5, margin: 5, width: 200, padding: 5 }} >
            {
                test.name 
                    ?<Text>{test.name}</Text>
                    :<Text>{test.nameRTK}</Text>
            }
             <ReactionButtons post={test} />
        </TouchableOpacity>
    ))
    return (
        <View style={{ flex: 3, alignItems: 'center' }}>
            <View style={{ margin: 10 }}>
                {selectUser}
                <Button title="Show Users" onPress={() => showUsers()} />
                {/* {
                    isFetching ? <Text>Fetching..</Text> : <Text>not Fetching</Text>
                }
                {
                    isLoading ? <Text>Loading..</Text> : <Text>not loading</Text>
                }
                {
                    IsError ? <Text>{error}</Text> : <Text>no errors</Text>
                }
                {
                    isSuccess ? <Text>ok</Text> : <Text>not working</Text>
                } */}
                {
                    postsRTK.length > 0 ?
                        poststest
                        :
                        <Text>brak postów</Text>

                }

            </View>

            <FlatList
                data={posts}
                renderItem={renderPosts}
                keyExtractor={(item) => item.id}
            />
            {
                userId != ''
                    ? <Button title="add new post" onPress={() => addPost()} />
                    : <Button title="add new post" disabled />
            }
            {
                userId != ''
                    ? <Button title="add new post rtk" onPress={() => addPostRTK()} color='green' />
                    : <Button title="add new post rtk" disabled />
            }



        </View>
    )

}