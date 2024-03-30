import "./message.css"
import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, remove, set, } from "firebase/database";
import { useSelector } from 'react-redux';
import one from '../../assets/images/one.jpg'

const messaGe = () => {
  
  const db = getDatabase();
  const [friendList, setFriendList] = useState()
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

  


  return (
    <div className='meg-wrap'>
      <div className='msg-user'>
        <h3 className='list-head'>Friend List</h3>
        <div className='msg-user-wrap'>
          
          {friendList &&  friendList.length?  
          friendList.map((item, index)=>(
            <div key={index} className='cardbox msg-boxx'>
            <div className='msg-user-item'>
              <div className='userinfobox'>
                <div className='Userimg msgimg'>
                  <img src={one} />
                </div>
                <div>
                {data.uid == item.whosendid 
                      ?
                      <h3>{item.whoreceivename}</h3>
                      :
                      <h3>{item.whosendname}</h3>
                    }
                    
                </div>
              
              </div>
              <button className='addbutton'>
                  Message
              </button>
          </div>
              
        </div>
          ))
            :
            "no frd"
          }
        
        </div>
      </div>
      <div className='msg-box-body'>
          <div className="msg-box-heading">
            <div className="msg-heading">
              <h3>DB</h3>
              <h4>Active now</h4>
            </div>
            
          </div>
      </div>
    </div>
  )
}

export default messaGe
