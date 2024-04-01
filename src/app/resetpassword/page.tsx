'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(" "); // State to store token extracted from URL

    useEffect(() => {
        // Extract token from URL when component mounts
        const query = new URLSearchParams(window.location.search);
        const token = query.get("token");
        console.log(token)
        setToken(token ||"");
    }, []);

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();
        if (!validatePassword(password, cpassword)) {
            setError("Please enter a valid password (minimum 6 characters) and make sure passwords match");
            toast.error("Please enter a valid password (minimum 6 characters) and make sure passwords match");
            return;
        }
        
        try {
            setLoading(true);
            // Send password reset request with token
            const response = await axios.post("api/users/resetpassword", { password, token });
            toast.success('Password successfully updated!');
            router.push("/login");
        } catch (error:any) {
            toast.error("Failed to reset password: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        if (name === "cpassword") {
            setCpassword(value);
        } else {
            setPassword(value);
        }
    };

    const validatePassword = (password:any, cpassword:any) => {
        return password.length >= 6 && password === cpassword;
    };

    return (
        <div className="text-white h-screen gap-24 flex flex-col items-center justify-center">
            <Toaster />
            <div className="text-6xl font-bold border-b-8">
                <h1>Confirm Password</h1>
            </div>
            <form onSubmit={handleFormSubmit} className="w-1/2 flex flex-col space-y-2">
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" onChange={handleInputChange} value={password} className="form-control" id="inputPassword" name="password" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input type="password" onChange={handleInputChange} value={cpassword} className="form-control" id="confirmPassword" name="cpassword" />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <button type="submit" className="btn btn-primary col-sm-2 mt-8" disabled={loading}>
                        {loading ? "Processing" : "Reset Password"}
                    </button>
                </div>
            </form>
        </div>
    );
}
