import React from 'react'
import FormInput from './formInput'
import BlueBtn from './InputBlueBtn'
import { useForm } from 'react-hook-form'
import ErrorMsg from './ErrorMsg'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserRegister = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            let res = await axios.post('http://localhost:3000/api/register', data);
            toast.success(res.data.message);
            reset(); // Clear form fields after successful submission
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const password = watch("password");

  return (
    <div className='flex flex-col justify-center h-screen'>
      <form className="w-1/4 mx-auto p-4 space-y-6 -translate-y-10" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold">Register as <i>user</i></h2>
        <FormInput
            placeholder="Full Name"
            type="text"
            register={register("name", { required: "Name is required" })}
            id="name"
        />
        <ErrorMsg
            error={errors.name}
            msg={errors.name?.message}
        />
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
        <FormInput
            placeholder="Confirm Password"
            type="password"
            register={register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Password don't match",
            })}
            id="confirmPassword"
        />
        <ErrorMsg
            error={errors.confirmPassword}
            msg={errors.confirmPassword?.message}
        />
        <BlueBtn btnText={"Register"} />

      </form>
    </div>
  )
}

export default UserRegister
