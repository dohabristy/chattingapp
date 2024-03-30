import React from 'react'
import GroupCard from '../groupcard/GroupCard'
import { FaPlus } from "react-icons/fa";
import'../groupcard/groupcard.css'
import one from '../../assets/images/one.jpg'
import { FaPlusCircle } from "react-icons/fa";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import  { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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

      // console.log(fRequest);


      let handleCancelfRequest = (cancelinfo) => {
        // console.log(cancelinfo);
        remove(ref(db, "friendrequest/" + cancelinfo.id)).then(()=>{
          toast.error('cancle request!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
            });
        })
     }
    
     let handleAcceptFRequest = (acceptinfo) => {
      console.log(acceptinfo);
      set(push(ref(db, "friends")),{
        whosendname: acceptinfo.sendername,
        whosendid: acceptinfo.senderid,
        whosendemail: acceptinfo.senderemail,
        whosendphoto: acceptinfo.senderimg,
        whoreceivename: data.displayName,
        whoreceiveid: data.uid,
        whoreceiveemail: data.email,
        whoreceivephoto: data.photoURL
      }).then(()=>{
        remove(ref(db, "friendrequest/" + acceptinfo.id))
        toast("Request accepted Successfully..")
      })
     }

  return (
  <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
    <GroupCard title="Friend Request">
        <div className='mainitem'>
               {fRequest && fRequest.length > 0 ? 
                  fRequest.map ((item , index)=>(
                    <div key={index} className='cardbox'>
                        <div className='useritem'>
                            <div className='Userimg'>
                                <img src={one} />
                            </div>
                            <div>
                              <h4>{item.sendername}</h4>
                            </div>
                        </div>
                        <div className='fuserbtn'>
                            <button onClick={()=>handleAcceptFRequest(item)} className='addbutton'>
                                Accept
                            </button>
                            <button onClick={()=>handleCancelfRequest(item)} className='addbutton'>
                                cancel
                            </button>
                            
                        </div>
                    </div>

                  ))
                  :
                  <h2>No Request Found</h2>
            }
                    
                    
            
        </div>        
                
    </GroupCard>
  </div>
  )
}

export default FriendRequest
