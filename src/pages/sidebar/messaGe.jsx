import "./message.css"
import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, remove, set, } from "firebase/database";
import { useSelector , useDispatch} from 'react-redux';
import one from '../../assets/images/one.jpg'
import { activeuser } from "../../slices/activeUserSlice";


const messaGe = () => {
  const [allMessage , setallMessage] = useState([])
  const [msgText ,setmsgText] = useState("")
  const db = getDatabase();
  const [friendList, setFriendList] = useState()
  const data = useSelector((state) => state.loginuserdata.value)
  const activechat = useSelector((state) => state. activeuserdata.value)
  console.log(activechat);

  const dispatch = useDispatch()

  // friend read operation
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

  //msg read operation
  useEffect(()=>{
    const messageRef = ref(db, 'message');
    onValue(messageRef, (snapshot) => {
      let arr = []
      let activeuserid = activechat.whosendid == data.uid ? activechat.whoreceiveid : activechat.whosendid
      console.log(activeuserid);
      snapshot.forEach((item)=>{
          if((item.val().senderid == data.uid && item.val().receiverid == activeuserid) || (item.val().receiverid == data.uid && item.val().senderid == activeuserid ) ){
              arr.push({...item.val(),id:item.key})
          }
      })
      setallMessage(arr)
    });
  },[activechat])

  let handleUser = (i) =>{
    dispatch(activeuser(i))
  }

  // let handleForm = (e) =>{
  //   console.log(e.targer.value);
  // }

  //msg write operation
  let handleSubmit = () =>{
    // console.log(msgText);
    set(push(ref(db, "message")),{
      senderid: data.uid,
      senderemail: data.email,
      sendername: data.displayName,
      message: msgText,
      receiverid: data.uid == activechat.whoreceiveid ? activechat.whosendid : activechat.whoreceiveid,
      receivername: data.uid == activechat.whoreceiveid ? activechat.whosendname: activechat.whoreceivename,
      receiveremail: data.uid == activechat.whoreceiveid ? activechat.whosendemail : activechat.whoreceiveemail,
    }).then(()=>{
      console.log("msg send hoise");

    })

    

  }
  return (
    <div className='meg-wrap'>
      <div className='msg-user'>
        <h3 className='list-head'>Friend List</h3>
        <div className='msg-user-wrap'>
          
          {friendList &&  friendList.length?  
          friendList.map((item, index)=>(
            <div key={index} className='cardbox msg-boxx'>
            <div onClick={()=>handleUser(item)} className='msg-user-item'>
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
            "No Friend Availble"
          }
        
        </div>
      </div>
      {activechat != null 
        ?
        <div className="msg-box-body">
            <div className="msg-box-heading">
              <div className="active-msg">
                <h2>{activechat &&
                    activechat.whosendid == data.uid
                    ?
                    activechat.whoreceivename
                    :
                    activechat.whosendname
                  }
                
                </h2>
                <p>Active now</p>
              </div>
            </div>
            <div className="msg-main">
              {allMessage.map((item,index)=>(
                  <div key={index} className={`${item.receiverid == data.uid ? "receivemsg" : "sendmsg"}`}>
                    <p>{item.message}</p>
                  </div>
              ))

              }
            </div>

            <div className="msg-footer">
                <input  onChange={(e)=> setmsgText(e.target.value)} type="text"  placeholder="type here" className="msg-input"/>
                <button onClick={handleSubmit} className="msgsendbtn">send</button>
            </div>

        </div>
        :
        <h2>Please selete a user</h2>
      }
     
    </div>
  )
}

export default messaGe
