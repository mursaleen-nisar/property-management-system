import React from 'react'
import FormInput from './formInput'
import BlueBtn from './InputBlueBtn'
import { useForm } from 'react-hook-form'
import ErrorMsg from './ErrorMsg'

const LoginPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

  return (
    <div className='flex flex-col justify-center h-screen'>
      <form className="w-1/4 mx-auto p-4 space-y-6 -translate-y-10" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold">Login to your <i>account</i></h2>
        <FormInput
            placeholder="Email"
            type="email"
            register={register("email", { required: "Email is required" })}
            id="email"
        />
        <ErrorMsg
            error={errors.email}
            msg={errors.email?.message}
        />
        <FormInput
            placeholder="Password"
            type="password"
            register={register("password", { required: "Password is required" })}
            id="password"
        />
        <ErrorMsg
            error={errors.password}
            msg={errors.password?.message}
        />
        <BlueBtn btnText={"Login"} />
      </form>
    </div>
  )
}

export default LoginPage
