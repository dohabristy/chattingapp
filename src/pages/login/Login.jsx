import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './login.css'
import SectionHeading from '../../components/SectionHeading';
import img from '../../assets/images/logo.png'
import TextField from '@mui/material/TextField';
import Custonbtn from '../../components/Custonbtn';
import AuthNavigate from '../../components/AuthNavigate';
import loginimg from '../../assets/images/loginimg.jpg'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Modal } from '@mui/material';
import Alert from '@mui/material/Alert';
import { getAuth, signInWithEmailAndPassword ,signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const Login = () => {
  let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   let [passShow,SetPass] = useState(false)
   let [visible] = useState(false)
   let handlePass = ()=> {
    if (passShow){
        SetPass(false)
        {<FaEyeSlash />}
        
      }else{
        SetPass(true)
        {<FaEye />}
      }
   }
   
   const navigate = useNavigate();
   const auth = getAuth();
   const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let [formdata,setFormdata] = useState({
      email: "",
      password:""
    })
    let [error,setError] = useState({
      email: "",
      password:""
    })

    let handleform = (e)=>{
      let {name, value}= e.target
      setFormdata({
      ...formdata,[name]:value
    })

    }
    
    let handleformsubmit = () => {
      if(!formdata.email){
        setError({email: "email nai"});
      }
      else if(!formdata.email.match(emailregex)){
       setError({email: "invaid formet"})
        console.log(!formdata.email.match(emailregex));
      }
      else if(!formdata.password){
        setError({email:""});
        setError({password: "passnai"});
      }else{
        signInWithEmailAndPassword(auth, formdata.email , formdata.password).then((userCredential)=>{
          if (userCredential.user.emailVerified){
            //  console.log(userCredential);
            localStorage.setItem("user", JSON.stringify(userCredential.user))
            dispatch(loginuser(userCredential.user))
            navigate("/home")
            console.log(userCredential.user);
           
             
          }else{
            signOut(auth).then(()=>{
              // console.log("verify your mail");
              // console.log("sing out");
              toast.error('please verify!', {
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
          console.log(userCredential);
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode=="auth/invalid-credential"){
            setError({email: "invalid email or password"})
          }else{
            setError({email: ""})
          }
          console.log(errorCode);
          console.log(errorMessage);
        });
      
        setError({
          email:"",
          password:""
        })
        // console.log(formdata);
      }
      
    }

  let [forgotData, setForgotData]= useState({
    forgotmail: ""
  })
  let[forgoterror,setforgoterror] = useState({
    forgotmail:""
  })

  let handleforgot =(e)=>{
    let {name, value} = e.target
      setForgotData({
        ...forgotData,[name]:value
      })
  }

  let handleforgotsubmit =()=>{
    if(!forgotData.forgotmail){
      setforgoterror({forgotmail:"Forget Your Mail"})
    }else if (!forgotData.forgotmail.match(emailregex)){
      setforgoterror({forgotmail:"formet thik nai"})
    }else{
      setforgoterror({
       forgotmail:""
      })
      console.log(forgotData);
    }
  }
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <div className='login-box'>
              <div className='box-one'>
                  <div>
                      <SectionHeading style="auth-head" text='Login Your Account'/>
                  </div>
                  <div className='proverlogin'>
                      <div className='logo'>
                          <img src={img} alt="" />
                      </div>
                      <div className='login'><SectionHeading text='Login With Google' className='text'/></div>
                  </div>
                  <div className='outlined'>
                      <TextField onChange={handleform} id="standard-basic" label="Email Address" variant="standard" type='text' name='email'/>
                      {error.email && <Alert className='error' severity="error">{error.email}</Alert>}
                  </div>
                  <div className='outlined'>
                      <TextField onChange={handleform} id="standard-basic" label="Password" variant="standard" type={passShow ? "text" : "password"} name='password'/>
                      {error.password && <Alert className='error' severity="error">{error.password}</Alert>}
                      
                      <span onClick={handlePass}>
                        { passShow ?<FaEyeSlash/> : <FaEye/> }
                      </span>
                      
                  </div>
                  <div className='btn'>
                      <Custonbtn onClick={handleformsubmit} variant='contained' text="Login With Google" styling='loginbtn'/>
                  </div>
                  <div>
                      <AuthNavigate style="auth" link="/registrasion" linktext="Sing up" text="Don’t have an account?"/>
                  </div>
                  <div>
                    <p className='forget'>
                      Singin with Password? 
                      <span onClick={handleOpen}>Forget Password</span>
                    </p>
                  </div>
              </div>
            </div>

          </Grid>
          <Grid item xs={6}>
            <div className='img-box'>
              <img src={loginimg}/>
            </div>
          </Grid>
        </Grid>
      </Box>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='forget-box'>

        <h2>Forget Password</h2>
        <div className='outlined'>
          <TextField name='forgotmail' onChange={handleforgot} id="standard-basic" label="Email Address" variant="standard" type='text'/>
          {forgoterror.forgotmail &&<Alert className='error' severity="error">{forgoterror.forgotmail}</Alert>}
        </div>
        <div className='forgetbtn'>
          <Custonbtn onClick={handleforgotsubmit} variant='contained' text="Sent Link" styling='loginbtn'/>
        </div>
      </Box>
    </Modal>  
    </>
  )
}

export default Login
