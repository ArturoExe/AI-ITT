import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons'

export const CameraSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        height: '300px',
        width: '300px',
        borderRadius: '30px'
      }}
    >
      <FontAwesomeIcon
        icon={faCameraAlt}
        style={{
          margin: '100px',
          fontSize: '100px',
          backgroundColor: '#ffffff'
        }}
      />
    </div>
  )
}
