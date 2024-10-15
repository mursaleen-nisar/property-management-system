import React from 'react'

const BlueBtn = ({ btnText }) => {
  return (
    <input type='submit' value={btnText} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none w-full cursor-pointer" />
  )
}

export default BlueBtn
