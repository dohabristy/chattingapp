import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SectionHeading from '../../components/SectionHeading';
import './registrasion.css'
import TextField from '@mui/material/TextField';
import Custonbtn from '../../components/Custonbtn';
import AuthNavigate from '../../components/AuthNavigate';
import registraimg from '../../assets/images/regi.png';
import Alert from '@mui/material/Alert';
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification, updateProfile } from "firebase/auth";
import { BallTriangle } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const Registrasion = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const[loader,setLoader] = useState(false)

  let [Error,setError] = useState({
    email: "",
    fullname:"",
    password:""
  })
  let [singupData, setsingupData] = useState({
    email: "",
    fullname:"",
    password:""
  })

  let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  let handleForm =(e)=> {
    let {name, value}= e.target
    setsingupData({
      ...singupData,[name]:value
    })
  }

  let handleSubmit = () => {
    if(!singupData.email){
      setError({email:"email nai"});
    } 
    else if (!singupData.email.match(emailregex)){
      setError({email: "formet thik nai"})
    }
    else if (!singupData.fullname){
      setError({email:""});
      setError({fullname: "name nai"});
    }else if (!singupData.password){
      setError({fullname: ""});
      setError({password:"pass nai"});
    }else{
      setLoader(true)
      setError({
        email: "",
        fullname:"",
        password:""
      })

      createUserWithEmailAndPassword(auth, singupData.email, singupData.password)
      .then((userCredential) => {
        sendEmailVerification (auth.currentUser)
       console.log("sent done");
       console.log(userCredential);
      
       updateProfile(auth.currentUser,{
        displayName: singupData.fullname,
        photoURL:"https://www.freepik.com/free-photos-vectors/female-avatar"
       }).then(()=>{
        navigate("/")
        // console.log(userCredential);
       
        set(ref(db, 'users/' + userCredential.user.uid), {
          username: userCredential.user.displayName,
          email: userCredential.user.email,
          profile_picture : userCredential.user.photoURL
        })

       })
       setsingupData({
        email: "",
        fullname:"",
        password:""
       })
      }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/email-already-in-use"){
          setError({email:"email already use"});
        }else{
          setError({email:""});
        }
        console.log(errorMessage);
      })
     setTimeout(() => {
      setLoader(false)
     }, 2000);
      console.log(singupData);
    }
    
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className='registrasion'>
            <div className='box-one'>
              <SectionHeading style="auth-headingg" text='Get started with easily register'/>
              <p>Free register and you can enjoy it</p>
              <div className='out'>
                <TextField onChange={handleForm} id="outlined-basic" label="EmailAdress" variant="outlined" name='email' value={singupData.email} />
                {
                  Error.email && <Alert className='errorr' severity="error">{Error.email}</Alert>
                }
                
              </div>
              <div className='out'>
                <TextField onChange={handleForm} id="outlined-basic" label="Full Name" variant="outlined" name='fullname' value={singupData.fullname} />
                {
                  Error.fullname && <Alert className='errorr' severity="error">{Error.fullname}</Alert>
                }
              </div>
              <div className='out'>
                <TextField onChange={handleForm} id="outlined-basic" label="Password" variant="outlined" type='password' name='password' value={singupData.password}/>
                {
                  Error.password && <Alert className='errorr' severity="error">{Error.password}</Alert>
                }
              </div>
              <div className='ball'>
                {loader?
                  <BallTriangle className='spin'
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  
                  />
                :
                  <div className='button'>
                    <Custonbtn onClick={handleSubmit} variant='contained' text="Login With Google" styling='loginbtn'/>
                  </div>
                }
              </div>
              
              
              
              
              <div>
                <AuthNavigate style="auth" link="/" linktext="Sing up" text="Don’t have an account?"/>
              </div>
            </div>
            
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='regiimg'>
            <img src={registraimg}/>
          </div>
        </Grid>
        
      </Grid>
    </Box>
    </>
  )
}

export default Registrasion
