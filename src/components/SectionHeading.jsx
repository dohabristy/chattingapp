import React from 'react'

const SectionHeading = ({style, text}) => {
  return (
    <div>
        <h3  className={style}>{text}</h3>
    </div>
  )
}

export default SectionHeading
