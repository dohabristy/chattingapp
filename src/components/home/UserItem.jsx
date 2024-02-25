import React, { useEffect, useState } from 'react'
import GroupCard from '../groupcard/GroupCard'
import'../groupcard/groupcard.css'
import one from '../../assets/images/one.jpg'
import { FaPlusCircle } from "react-icons/fa";
import { getDatabase, ref, onValue,set ,push} from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';




const UserItem = () => {
    const[userlist, setUserlist] = useState()
    const db = getDatabase();
    const [fRequest, setfRequest] = useState([])
    const [friendList, setfriendList] = useState([])
    const data = useSelector((state) => state.loginuserdata.value)
    // console.log(data.uid);
    

    // all users data
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key})
        }
      })
      setUserlist(arr)
    });
  },[])
  // console.log(userList);
   

      //add friend request 

      let handleFRequest = (frequestinfo) => {
        console.log(frequestinfo);
        set(ref(db, "friendrequest/" + frequestinfo.id),{
          senderid: data.uid,
          sendername: data.displayName,
          senderimg: data.photoURL,
          senderemail: data.email,
          receiverid: frequestinfo.id,
          receivername: frequestinfo.username,
          receiveremail: frequestinfo.email,
          receiverimg: frequestinfo.profile_picture

        }).then(()=>{
          // toast("Friend Request Send Successfully")
        })
      }

  //     //friend request data
  // useEffect(()=>{
  //   const fRequestRef = ref(db, 'friendrequest');
  //   onValue(fRequestRef, (snapshot) => {
  //     let arr = []
  //     snapshot.forEach((item)=>{
  //       if(item.val().senderid == data.uid){
  //         arr.push(item.val().receiverid + item.val().senderid)
  //       }
  //     })
  //     setfRequest(arr)
  //   });
  // },[])

  // //friend data
  // useEffect(()=>{
  //   const friendsRef = ref(db, 'friends');
  //   onValue(friendsRef, (snapshot) => {
  //     let arr = []
  //     snapshot.forEach((item)=>{
  //       if(item.val().whoreceiveid == data.uid || item.val().whosendid == data.uid){
  //         arr.push(item.val().whoreceiveid + item.val().whosendid)
  //       }
  //     })
  //     setfriendList(arr)
  //   });
  // },[])

  //     let handleCancle = (i) => {
  //       // console.log(i.id);
  //       remove(ref(db, "friendrequest/" + i.id)).then(()=>{
  //         // toast("Request Cancel..")
  //       })
  //     }
    
     

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
                        {/* {
                      fRequest.length > 0 && fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
                      ?<>
                        <button className='addbutton'>pending</button>
                        <button onClick={()=>handleCancle(item)} className='addbutton'>cancel</button>
                      </>
                      :
                      friendList.includes(item.id + data.uid) || friendList.includes(data.uid + item.id)
                        ?
                        <button className='addbutton'>friend</button>
                        :
                        <button onClick={()=>handleFRequest(item)} className='addbutton'>
                          add
                        </button>
                      } */}
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
