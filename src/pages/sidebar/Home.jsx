import React from 'react'
import '../../components/groupcard/groupcard.css'
import UserItem from '../../components/home/UserItem'
import FriendRequest from '../../components/home/FriendRequest'
import Friends from '../../components/home/Friends'
import Block from '../../components/home/Block'
const Home = () => {
  return (
    <div className='homeitem'>
      <UserItem/>
      <FriendRequest/>
      <Friends/>
      <Block/>
    </div>
  )
}

export default Home
