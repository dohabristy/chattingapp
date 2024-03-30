import React from 'react'
import GroupCard from '../groupcard/GroupCard'
import  { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from 'react-redux';
import one from '../../assets/images/one.jpg'
import'../groupcard/groupcard.css'
const Friends = () => {

const [blockList, setBlockList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  useEffect(()=>{
    const blockRef = ref(db, 'block');

    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
          if(item.val().whoblockid == data.uid){
            arr.push({...item.val(),id:item.key})
          }
      })
      setBlockList(arr)
    });
    },[])
console.log(blockList);

  return (
    <div>
        <GroupCard title="Block List">
            <div className='mainitem'>
                {blockList && blockList.map((item,index)=>(
                    <div key={index} className='cardbox'>
                        <div key={index} className='useritem'>
                            <div className='Userimg'>
                                <img src={one} alt="" />
                            </div>
                            <div className='info'>
                            <h3>{item.blockname}</h3>
                            </div>
                            
                            
                        </div>
                        <button className='addbutton'>
                                Unblock
                            </button>
                    </div>
                    
                ))
                }
            </div>
            
        </GroupCard>

    </div>
  )
}

export default Friends
