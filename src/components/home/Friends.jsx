import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from 'react-redux';
import GroupCard from '../groupcard/GroupCard';
import one from '../../assets/images/one.jpg'


const Friends = () => {
  const [friendList, setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
          if(data.uid == item.val().whoreceiveid || data.uid == item.val().whosendid){
            arr.push({...item.val(),id:item.key})
          }
      })
      setFriendList(arr)
    });
  },[])

  //block operation
  let handleBlock = (blockinfo) => {
    set(push(ref(db, "block")),{
      whoblockid: data.uid,
      whoblockname: data.displayName,
      whoblockemail: data.email,
      whoblockimg: data.photoURL,
      blockid: blockinfo.whoreceiveid,
      blockemail: blockinfo.whoreceiveemail,
      blockname: blockinfo.whoreceivename,
      blockimg: blockinfo.whoreceivephoto,
    }).then(()=>{
      remove(ref(db, "friends/"+blockinfo.id))
    })
  }


  return (
    <>
        <GroupCard cardtitle="Friend">
          <div className='mainitem'>
            {friendList && friendList.length > 0 ? friendList.map((item,index)=>(
              <div key={index} className='cardbox'>
                  <div className='useritem'>
                    <div className='Userimg'>
                      <img src={one} />
                    </div>
                    <div className='userinfobox'>
                    <div>
                    {data.uid == item.whosendid 
                          ?
                          <h3>{item.whoreceivename}</h3>
                          :
                          <h3>{item.whosendname}</h3>
                        }
                        
                    </div>
                    
                    </div>
                </div>
                    <button onClick={()=>handleBlock(item)} className='addbutton'>
                        Block
                    </button>
              </div>
                
            ))
            :
            <h1>no friend available..</h1>
            }
          </div>
      </GroupCard>
    </>
  )
}
export default Friends
