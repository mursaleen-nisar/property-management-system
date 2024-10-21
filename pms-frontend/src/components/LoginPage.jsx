import React, { useEffect, useContext } from 'react'
import FormInput from './FormInput'
import BlueBtn from './InputBlueBtn'
import { useForm } from 'react-hook-form'
import ErrorMsg from './ErrorMsg'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to dashboard page if the user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data) => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`, data, {
                withCredentials: true
            });
            toast.success(res.data.message);
            login();
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

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
        <p className='text-zinc-400'>Don't have an account? <Link to="/register" className='underline'>Register here</Link></p>
      </form>
    </div>
  )
}

export default LoginPage
