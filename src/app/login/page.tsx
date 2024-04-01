'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleForm = async (e: any) => {
        e.preventDefault(); // Set loading state when form is submitted
        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!validatePassword(formData.password)) {
            setError("Please enter a valid password (minimum 6 characters)");
            return;
        }
        setError(""); // Reset error state if validation succeeds

        try {
            const response = await axios.post("api/users/login", formData);
            toast.success('Successfully logged in!');
            router.push("/profile");
        } catch (error: any) {
            // Check for specific error cases and display appropriate toast messages
            if (error.response) {
                // Server responded with a status code outside of 2xx
                if (error.response.status === 401) {
                    toast.error("Incorrect email or password");
                } else {
                    toast.error("An error occurred. Please try again later.");
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response received from server");
            } else {
                // Something happened in setting up the request that triggered an error
                toast.error("Error processing request");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email: any) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: any) => {
        return password.length >= 6;
    };

    return (
        <section className="relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/img1.png)', filter: 'blur(2px)'}}>
        {/* Background with blur */}
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex bg-gray-900 items-center border-2 py-4 px-4 rounded-xl mb-6 text-2xl font-semibold text-white">
                        All IN ONE
                </Link>
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleForm} className="space-y-4 md:space-y-6" action="#" method="post">
                            <Toaster />
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" onChange={handleInputChange} value={formData.password} id="password" placeholder="••••••••" className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border rounded  focus:ring-3  bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-300">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            { error && <div className="text-red-500">{error}</div> }
                            {<div className="flex justify-between items-center">{loading ? <button type="submit" className="btn btn-warning">Processing</button> : <button type="submit" className="btn btn-dark">Log In</button>} <Link className="text-gray-100 hover:underline" href="/forgetpassword">Forget Password</Link></div>}
                            <p className="text-sm font-light text-gray-400">
                                Don’t have an account yet? <Link href="/signup"  className="font-medium  hover:underline text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
    
}
