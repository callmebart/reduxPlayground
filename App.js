import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

/*Redux*/
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import store from './src/store';

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from './src/features/counter/counterSlice';

import { postAdded } from './src/features/posts/postsSlice';

export const PostsList = () => {
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const addPost=()=>{
    dispatch(
      postAdded({
        id:nanoid(),
        name:'added post',
        content:'post added by dispatch func'
      })
    )
  }
  const renderPosts = ({ item, index }) => {
    return (
      <View style={{borderWidth:1,borderRadius:5,margin:5,width:200,padding:5}}>
        <Text style={{ color: 'black',fontWeight:'bold',fontSize:20 }}>{item.name}</Text>
        <Text >{item.content}</Text>
        
      </View>

    )
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item) => item.id}
      />
      <Button title="add new post" onPress={()=>addPost()}/>
    </View>
  )

}
const Counter = () => {
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
const Screen = () => {

  return (
    <View style={styles.container}>
      <Counter />
      <PostsList />
    </View>
  );
}



function App() {

  return (
    <Provider store={store}>
      <Screen />
    </Provider>
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

export default App