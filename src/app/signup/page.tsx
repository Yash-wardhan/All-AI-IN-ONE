'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Submit Handler

    const handleForm = async (e: any) => {
        try {
            e.preventDefault();
            if (!validateEmail(formData.email)) {
                setError("Please enter a valid email address");
                toast.error("Please enter a valid email address");
                return;
            }
            if (!validatePassword(formData.password, cpassword)) {
                setError("Please enter a valid password (minimum 6 characters) and make sure passwords match");
                toast.error("Please enter a valid password (minimum 6 characters) and make sure passwords match");
                return;
            }
            setError(""); // Reset error state if validation succeeds
            console.log(formData);
            setFormData({ username: "", email: "", password: "" }); // Clear form fields
            setCpassword(""); // Clear confirm password field
            // Further actions like sending the form data to an API can be performed here
            setLoading(true);
            const response = await axios.post("api/users/signup", formData);
            toast.success("Successfully Signed up !!!", response.data)
            router.push('/login')
        } catch (error: any) {
            toast.error("Signup Failed", error.message)
        } finally {
            setLoading(false)
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "confirm_password") {
            // If the input is for confirm password, update cpassword state
            setCpassword(value);
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateEmail = (email: any) => {
        // Basic email validation using regular expression
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: any, cpassword: any) => {
        // Basic password validation (minimum 6 characters) and password match check
        return password.length >= 6 && password === cpassword;
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/signup.png)'}}>
        {/* Background with blur */}
            </div>
            <div className="relative z-10 bg-grey-lighter min-h-screen flex flex-col text-white">
                <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-gray-700 px-6 py-8 rounded shadow-md text-black w-full">
                        <form method="post" onSubmit={handleForm}>
                            <Toaster />
                            <h1 className="mb-8 text-3xl text-white text-center">Sign up</h1>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="username"
                                placeholder="Full Name"
                                onChange={handleInputChange}
                                value={formData.username}
                            />


                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" onChange={handleInputChange} value={formData.email} />

                            <input
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" onChange={handleInputChange} value={formData.password} />
                            <input
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm_password"
                                placeholder="Confirm Password" onChange={handleInputChange} value={cpassword} />

                            {error && <div className="text-red-500 mb-2">{error}</div>}
                            {loading ? <button type="submit" className="btn btn-warning w-full">Processing</button> : <button type="submit" className="btn btn-primary w-full">Create Account</button>}
                        </form>
                    </div>

                    <div className="text-grey-dark mt-6 text-blue-700">
                        Already have an account?
                        <Link className="no-underline border-b border-blue text-blue" href="/login">
                            Log in
                        </Link>.
                    </div>
                </div>
            </div>
        </div>
    );

}
