import React from 'react'
import './groupcard.css'
import { BsThreeDotsVertical } from "react-icons/bs";

const GroupCard = ({title,children}) => {
  return (
    <div className='card'>
      <div className='grouphead'>
        <h4>{title}</h4>
        <div className='dots'>
          <BsThreeDotsVertical />
        </div>
      </div>
      {children}

    </div>
  )
}

export default GroupCard
