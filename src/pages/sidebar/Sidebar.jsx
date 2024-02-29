import React, { useEffect } from 'react'
import '../sidebar/sidebar.css'
import profile from "./profile/dp.jpg"
import { IoHomeOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { Link, NavLink, Navigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword ,signOut, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const Sidebar = () => {
    const data = useSelector((state) => state.loginuserdata.value);
    // console.log(data);
    const auth = getAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!data) {
          navigate("/");
        } else {
          navigate("/home");
        }
      }, []);

    let handleLogout = () => {
        signOut(auth).then(()=> {
            localStorage.removeItem("user");
            // dispatch(loginuser(null));
            navigate("/")
            toast.success("Logout Done", {
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

   const userinfo = auth.currentUser
//    console.log(userinfo.displayName);

// let a = localStorage.getItem("user")
// console.log(a);

  return (
<>
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
    <div className='sidebar-box'>
        <div className=''>
            <div className='profile'>
                    <img src={profile} alt="" />
            </div>
            <h3 className='User'>{ data &&data.displayName}</h3>
            <h4 className='emaildesign'>{data && data.email}</h4>
        </div>
        <div className='navigation'> 
            <ul>
                <li>
                    <NavLink to="/home">
                        <IoHomeOutline />
                    </NavLink>
                    
                </li>
                <li>
                    <NavLink to="/message">
                        <AiFillMessage />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notification">
                        <IoIosNotificationsOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/setting">
                        <CiSettings />
                    </NavLink>
                </li>
                
            </ul>
        </div>
        <div className='logout'>
            <button onClick={handleLogout} className='logout'><IoMdLogOut /></button>
        </div>
    </div>

</>
    
  )
}

export default Sidebar
