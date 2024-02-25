import React from 'react'
import GroupCard from '../groupcard/GroupCard'
import { FaPlus } from "react-icons/fa";
import'../groupcard/groupcard.css'
import one from '../../assets/images/one.jpg'
import { FaPlusCircle } from "react-icons/fa";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import  { useEffect, useState } from 'react';

const FriendRequest = () => {
     
    const db = getDatabase();
    const data = useSelector((state) => state.loginuserdata.value)
    const [fRequest, setfRequest] = useState()

    useEffect(()=>{
        const fRequestRef = ref(db, 'friendrequest');
        onValue(fRequestRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(data.uid == item.val().receiverid){
              arr.push({...item.val(),id:item.key})
            }
          })
          setfRequest(arr)
        });
      },[])

      console.log(fRequest);


    //   let handleCancelFRequest = (cancelinfo) => {
    //     remove(ref(db, "friendrequest/" + cancelinfo.id)).then(()=>{
    //       toast("Request Cancel..")
    //     })
    //  }
    
    //  let handleAcceptFRequest = (acceptinfo) => {
    //   console.log(acceptinfo);
    //   set(push(ref(db, "friends")),{
    //     whosendname: acceptinfo.sendername,
    //     whosendid: acceptinfo.senderid,
    //     whosendemail: acceptinfo.senderemail,
    //     whosendphoto: acceptinfo.senderimg,
    //     whoreceivename: data.displayName,
    //     whoreceiveid: data.uid,
    //     whoreceiveemail: data.email,
    //     whoreceivephoto: data.photoURL
    //   }).then(()=>{
    //     remove(ref(db, "friendrequest/" + acceptinfo.id))
    //     toast("Request accepted Successfully..")
    //   })
    //  }

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
                        <button onClick={()=>handleAcceptFRequest(item)} className='addbutton'>
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
