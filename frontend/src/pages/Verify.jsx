import { useState } from "react";
import { useLocation,useNavigate,Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Verify =()=>{

    const navigate = useNavigate();
    const location = useLocation()
    const {loginUser} = useAuth()

    const email = location.state?.email;

    const [code,setCode] = useState("")
    const [loading,setLoading] = useState(false)

    if(!email){
        return(
            <div className="flex min-h-[calc(100vh-61px)] items-center jusify-center bg-gray-50 px-4">
                <p className="text-center text-gray-600">
                    Please{" "}
                    <Link to="/register" className="font-medium text-rose-500 hover:underline">
                    sign up
                    </Link>{" "}
                    first.
                </p>
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const res = await api.post("/auth/verify-email",{email,code})
            loginUser(res.data.token,res.data.user);
            toast.success("Email Verified.Welcome!")
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Somthing Went Wrong");
        }
        setLoading(false)
    }
    const handleResend = async () => {
        try {
            const res = await api.post("/auth/resend-otp",{email,type:"verify"})
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return(
        <div className="flex min-h-[calc(100vh-61px)] items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-6 text-center">
                    <ShieldCheck className="mx-auto mb-2 text-rose-500" size={36}/>
                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Verify Your Email</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        We sent a 6-digit-code to <span className="font-medium">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                    type="text"
                    maxLength={6}
                    placeholder="00000"
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 text-center text-2xl tracking-widest outline-none focus:border-rose-500"
                    />
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-rose-500 py-3 font-medium text-white transition hover:bg-rose-600 disabled:opacity-60">
                        {loading ? "Verifying...":"Verify"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Didn't get the code?{" "}
                    <button onClick={handleResend} className="font-medium text-rose-500 hover:underline">
                        Resend Code
                    </button>
                </p>

            </div>
        </div>
    )

}
export default Verify