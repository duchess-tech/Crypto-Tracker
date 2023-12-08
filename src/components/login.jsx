import React, { useState } from 'react';
// import AppAuth from '../utils/auth';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaEnvelope } from 'react-icons/fa'
import { faMultiply } from '@fortawesome/free-solid-svg-icons'
import {
    Button,
    // Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const Login = ({ open, setOpen, handleOpen }) => {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const cancelButtonRef = useRef(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [error, setError] = useState(false)

    // const handleLogin = () => {
    //     if (username === '' && password === '') {
    //         const tok = AppAuth.generateToken({ username })
    //         const token = JSON.stringify(tok)
    //         localStorage.setItem('token', token)
    //         setOpen(false)
    //     } else {
    //         alert("invalid")
    //     }
    // }

    const handleLogin = async () => {
        setLoading(true)
        if (username === '' && password === '') {
            const tokenNumber = Math.random().toString(36).substring(7)

            await localStorage.setItem('token', tokenNumber)

            setOpen(false)
            setError(false)
            setLoading(false)
        } else {
            alert("invalid")
            setLoading(false)
        }
    }


    const onClose = () => {
        setOpen(true)
        setError(true)

    }

    return (
        <>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 top-0 z-10 w-screen p-4 lg:p-0  ">
                        <div className="flex  justify-center  text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative  justify-center  lg:p-0 transform overflow-auto removeScrollbar lg:w-9/12 h-[620px]   lg:h-[500px] bg-white rounded-lg  shadow-xl transition-all    sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="flex sticky top-0  lg:w-full bg-white p-3 left-0 font-bold xl:justify-center xl:text-2xl   lg:justify-start lg:gap-32">

                                        <h1 className=' font-bold flex'>Welcome to Crypt<span><img src="images/coin2.jpg" alt="" className="w-[30px]" /></span>Tracker</h1>

                                    </div>
                                    <hr />

                                    <div className="text-start">
                                        <div className='m-auto form-control pb-2'>
                                            <input type="text" placeholder='Username' className='form-control h-12 justify-between p-6 flex items-center rounded-xl border-black  mt-3 text-lg font-semibold'
                                                value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <input type="password" placeholder='Password' className='form-control h-12 justify-between p-6 flex items-center rounded-xl border-black  mt-3 text-lg font-semibold' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>



                                        <div className="m-auto form-control pb-2 border-0">
                                            <button className={`${error ? ("animate-pulse") : ""} form-control h-12  cursor-pointer  rounded-xl bg-[#e01561] text-[#ffffff] mb-4 text-lg font-semibold `} onClick={handleLogin}>{loading ? <span className="spinner-border text-white"></span> : "Login"}   </button>



                                            <button className=" form-control h-12  justify-between p-6 flex items-center rounded-xl border-black mt-3 text-lg font-semibold ">
                                                <FcGoogle></FcGoogle>
                                                <span>continue with google</span></button>
                                            <button className=" form-control h-12 justify-between p-6 flex items-center rounded-xl border-black  mt-3 text-lg font-semibold">
                                                <FaApple></FaApple>
                                                <span>continue with Apple</span>
                                            </button>
                                            <button className=" form-control h-12 justify-between p-6 flex items-center  rounded-xl border-black  mb-2 mt-3 text-lg font-semibold">
                                                <FaEnvelope></FaEnvelope>
                                                <span>continue with email</span>
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>










            {/* <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody>
                    <div>
                        <h2>Login</h2>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog> */}
        </>













    );
};

export default Login
