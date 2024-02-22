import React from 'react'
import { Link } from 'react-router-dom'

const AuthNavigate = ({text,linktext,link,style}) => {
  return (
    <div>
      <p className={style}>
        {text}
        <Link to={link}>{linktext}</Link>
      </p>
    </div>
  )
}

export default AuthNavigate
