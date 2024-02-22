import React from 'react'
import Button from '@mui/material/Button';
const Custonbtn = ({variant,text,styling,onClick}) => {
  return (
    <div>
       <Button onClick={onClick} className={styling} variant={variant} >{text}</Button>
    </div>
  )
}

export default Custonbtn
