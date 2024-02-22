import React, { useEffect, useState } from 'react'
import GroupCard from '../groupcard/GroupCard'
import'../groupcard/groupcard.css'
import one from '../../assets/images/one.jpg'
import { FaPlusCircle } from "react-icons/fa";
import { getDatabase, ref, onValue,set } from "firebase/database";
import { useSelector } from 'react-redux';



const UserItem = () => {
    const[userlist, setUserlist] = useState()
    const db = getDatabase();
   
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    });

    useEffect(()=>{ 
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            arr.push({...item.val(),id:item.key})
          })
          setUserlist(arr)
        });
      },[])

      //add friend request 

      let handleFRequest = (frequestinfo) => {
        set(ref(db, "friendrequest/" + frequestinfo.id),{
          senderid: data.uid,
          sendername: data.displayName,
          senderimg: data.photoURL,
          senderemail: data.email,
          receiverid: frequestinfo.id,
          receivername: frequestinfo.username,
          receiveremail: frequestinfo.email,
          receiverimg: frequestinfo.profileimg
        }).then(()=>{
          // toast("Friend Request Send Successfully..")
        })
      }

  return (
   <>
        <GroupCard title="USER LIST">
            <div className='mainitem'>
                {userlist && userlist.length>0 
                ?
                userlist.map((item,index)=>(
                    <div key={index} className='cardbox'>
                        <div className='useritem'>
                            <div className='Userimg'>
                                <img src={one} />
                            </div>
                            <div>
                                <h4>{item.username}</h4>
                            </div>
                        </div>
                        <div className='userbtn'>
                            <button onClick={()=>handleFRequest(item)} className='addbutton'>
                                <FaPlusCircle />
                            </button>
                        </div>
                    </div>
                    ))

                    :
                    <h3>no user found</h3>
                }
                

        
            </div>
        </GroupCard>   
   </>
  )
}

export default UserItem
