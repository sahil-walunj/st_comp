import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { Eye, EyeOff } from "lucide-react";
import "../App.css";
import sallyImage from "../assets/Saly-14.svg";

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        name: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { name, password } = loginInfo;
        if (!name || !password) {
            return handleError('name and password are required');
        }

        setLoading(true);
        try {
            const url = `https://scout-81lm.onrender.com/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details || message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#CED4DA] min-h-screen flex flex-col">
            <div className="col-span-8 p-10 self-center sm:self-start font-semibold text-[1.5rem]">Scout</div>

            <div className="p-4 grid grid-cols-1 lg:grid-cols-8 justify-center bg-[#CED4DA] flex-1">
                <div className="hidden lg:block col-span-1"></div>
                <div className="flex lg:hidden flex-col col-span-2">
                    <div>
                        <div className="p-0 font-regular text-[2rem]">Sign in to</div>
                        <div className="p-0 font-semibold text-[1.8em]">Scout</div>
                        <div className="p-2"></div>
                    </div>
                </div>
                <div className="hidden lg:flex flex-col col-span-2">
                    <div className="mt-[20vh]">
                        <div className="p-0 font-regular text-[2.5rem]">Sign in to</div>
                        <div className="p-0 font-semibold text-[2.2em]">Scout</div>
                        <div className="p-2"></div>
                        <div className="p-0 font-regular text-[0.8rem]">If you don't have an account contact</div>
                        <div className="p-0 font-regular text-[0.8rem]">
                            <a className="underline text-blue-950" href="mailto:administrator@example.com">administrator</a>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex col-span-2 items-end">
                    <img src={sallyImage} alt="Sally" className="w-full h-[55vh]" />
                </div>
                <div className="col-span-3 flex items-center justify-center">
                    <div className="justify-self-center mb-[35.33vh] w-[400px]">
                        <h1 className="hidden lg:block text-3xl font-medium text-left mb-6">Sign in</h1>

                        {error && <p className="text-yellow-300 text-sm mb-4">{error}</p>}

                        <form onSubmit={handleLogin} className="space-y-6 w-full">
                            <div>
                                <label className="block font-medium">Username</label>
                                <input
                                    type="string"
                                    name="name"
                                    className="w-full px-5 py-3 border border-gray-400 rounded-md bg-[#ADB5BD] text-black placeholder-[#485058] focus:outline-none focus:ring-2 focus:ring-[#868C90]"
                                    placeholder="Enter Username"
                                    value={loginInfo.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className="block font-medium">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full px-5 py-3 border border-gray-400 rounded-md bg-[#ADB5BD] text-black placeholder-[#485058] focus:outline-none focus:ring-2 focus:ring-[#868C90]"
                                    placeholder="Enter Password"
                                    value={loginInfo.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-10 text-black"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 text-black font-bold bg-[#495057] rounded-md hover:bg-[#495057] transition disabled:bg-gray-500"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex lg:hidden flex-col col-span-2">
                    <div>
                        <div className="p-0 font-regular text-[0.8rem]">If you don't have an account contact</div>
                        <div className="p-0 font-regular text-[0.8rem]">
                            <a className="underline text-blue-950" href="mailto:administrator@example.com">administrator</a>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;