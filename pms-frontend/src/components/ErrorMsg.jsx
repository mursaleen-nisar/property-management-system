import React from 'react'

const ErrorMsg = ({ error, msg }) => {
  return (
    <>
      {error && <span className='text-red-600 text-sm'>{msg}</span>}
    </>
  )
}

export default ErrorMsg
