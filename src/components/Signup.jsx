import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const user = await authService.createAccount(data);
      console.log(user); // appwrite is not returning anything here, its just empty 'undefined'. Now appwrite is using localstorage to save the seission.

      if (user) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Sign up to create a new account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Already have an account?
          <Link
            to='/login'
            className='font-medium transition-all duration-200 hover:underline'
          >
            Login
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>
            <Input
              label='Full Name: '
              placeholder='Enter your full name'
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label='Email: '
              placeholder='Enter your email'
              type='email'
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value) ||
                    "Email address must be a  valid address",
                },
              })}
            />
            <Input
              label='Password: '
              placeholder='Enter your password'
              type='password'
              {...register("password", {
                required: true,
              })}
            />
            <Button type='submit' className='w-full cursor-pointer active:bg-blue-500'>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
