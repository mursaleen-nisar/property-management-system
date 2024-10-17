import React from 'react'

const RedBtn = ({ btnText, onClick }) => {
  return (
    <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none cursor-pointer h-fit" onClick={onClick}>{btnText}</button>
  )
}

export default RedBtn