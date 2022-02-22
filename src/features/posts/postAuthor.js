import React from 'react'
import { useSelector } from 'react-redux'
import { Text} from 'react-native';

export const PostAuthor = (props) => {
  const author = useSelector(state =>
    state.users.find(user => user.id === props.userId)
  )


  return <Text>author : {author ? author.name : 'unknown author'}</Text>
}