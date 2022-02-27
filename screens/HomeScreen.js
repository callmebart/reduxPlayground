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
import { postAdded } from '../src/features/posts/postsSlice';

/*selector functions*/
import { selectAllPosts, fetchPosts } from '../src/features/posts/postsSlice';

const PostsList = (props) => {



    const dispatch = useDispatch()
    const navigation = props.navigation

    const [userId, setUserId] = useState('');
    // const posts = useSelector(state => state.posts)
    const posts = useSelector(selectAllPosts)
    const users = useSelector(state => state.users)
    const name = 'new post with modified createslice';
    const content = "my component doesnt have to worry about payload"
    //ordering posts 
    //const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const orderedPosts = posts

    const postStatus = useSelector(state => state.posts.status)
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [])


    const addPost = () => {
        dispatch(postAdded(name, content, userId))
        setUserId('')
    }

    const goToPostPage = (post) => {
        navigation.navigate('SinglePostPage', {
            postId: post.id
        })
    }

    const selectUser = users.map(user => (
        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, margin: 5, width: 200, padding: 5 }} onPress={() => setUserId(user.id)} >
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
            <View style={{ borderWidth: 1, borderRadius: 5, margin: 5, width: 300, padding: 5 }}>
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
        <View style={{ flex: 3, alignItems: 'center' }}>
            <View style={{ margin: 10 }}>
                {selectUser}
            </View>
            <FlatList
                data={orderedPosts}
                renderItem={renderPosts}
                keyExtractor={(item) => item.id}
            />
            {
                userId != ''
                    ? <Button title="add new post" onPress={() => addPost()} />
                    : <Button title="add new post" disabled />
            }
        </View>
    )

}
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
