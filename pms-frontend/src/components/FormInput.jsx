import React from 'react'

const FormInput = ({ placeholder, type, id, register, min }) => {

  return (
    <div className='relative'>
      <input
        type={type}
        id={id}
        {...(type === 'date' ? { min } : {})}  // Conditionally pass min
        className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border border-zinc-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        {...register} placeholder=""
        />
      <label htmlFor={id} className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-zinc-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none select-none">{placeholder}</label>
    </div>
  )
}

export default FormInput