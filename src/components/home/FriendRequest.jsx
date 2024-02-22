import React from 'react'
import GroupCard from '../groupcard/GroupCard'
import { FaPlus } from "react-icons/fa";
import'../groupcard/groupcard.css'
import one from '../../assets/images/one.jpg'
import { FaPlusCircle } from "react-icons/fa";
const FriendRequest = () => {
  return (
    <div>
        <GroupCard title="Friend Request">
            <div className='mainitem'>
                <div className='cardbox'>
                    <div className='useritem'>
                        <div className='Userimg'>
                            <img src={one} />
                        </div>
                        <div>
                            <h4>Karina</h4>
                        </div>
                    </div>
                    <div className='userbtn'>
                        <button>
                            <FaPlusCircle />
                        </button>
                    </div>
                </div>
                <div className='cardbox'>
                    <div className='useritem'>
                        <div className='Userimg'>
                            <img src={one} />
                        </div>
                        <div>
                            <h4>Karina</h4>
                        </div>
                    </div>
                    <div className='userbtn'>
                        <button>
                            <FaPlusCircle />
                        </button>
                    </div>
                </div><div className='cardbox'>
                    <div className='useritem'>
                        <div className='Userimg'>
                            <img src={one} />
                        </div>
                        <div>
                            <h4>Karina</h4>
                        </div>
                    </div>
                    <div className='userbtn'>
                        <button>
                            <FaPlusCircle />
                        </button>
                    </div>
                </div>
        
            </div>
            
        </GroupCard>
    </div>
  )
}

export default FriendRequest
