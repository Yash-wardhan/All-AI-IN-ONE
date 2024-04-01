'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import validator from "validator"; // Import validator library for email validation

export default function ForgetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false)

    const handleForm = async (e:any) => {
        e.preventDefault();
        // Perform email validation
        if (!validator.isEmail(email)) {
            setError("Please enter a valid email address");
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true)
            const response = await axios.post("api/users/forgetpassword", { email });
            toast.success("Success!! Sent Email", response.data);
            router.push("/login");
        } catch (error:any) {
            setLoading(false)
            toast.error("Failed to send email", error.message);
        }
    };

    const handleInputChange = (e:any) => {
        setEmail(e.target.value);
        setError(""); // Clear error message when user starts typing
    };

    return (
        <div className="text-white h-screen gap-24 flex flex-col items-center justify-center">
            <Toaster />
            <h1 className="text-4xl border-b-8">Forget Password</h1>
            <form onSubmit={handleForm} className="w-1/2 space-y-3">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="name@example.com"
                    />
                    {error && <div className="text-red-500">{error}</div>}
                </div>
                {<div className="flex justify-between items-center">{loading ? <button type="submit" className="btn btn-warning">Processing</button> : <button type="submit" className="btn btn-dark">Submit</button>}</div>}
            </form>
        </div>
    );
}
