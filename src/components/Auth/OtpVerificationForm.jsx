import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { verifyOtp } from "../../services/operations/authAPI"

function OtpVerification() {
    const [otp, setOtp] = useState("")
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const signupData = useSelector((state) => state.auth.signupData)

    const handleOnChange = (e) => {
        setOtp(e.target.value)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const { firstName,
            lastName,
            email,
            password,
            confirmPassword, } = signupData
        console.log("sign up ", signupData)


        console.log("hello data ", firstName,
            lastName,
            email,
            password,
            confirmPassword, otp)
        await verifyOtp(firstName,
            lastName,
            email,
            password,
            confirmPassword, otp)
            //  console.log(data)
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                console.log("err ", firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword, otp)
                console.error("Error verifying OTP", error)
            })
    }

    return (
        <div className="flex h-screen bg-gray-200 flex-col items-center justify-center">
            <div className="text-2xl font-bold ">
                Otp Verification Form
            </div>

            <div>
                <form onSubmit={handleOnSubmit} className="flex border-[1px] p-5 shadow-2xl mt-6 w-full flex-col gap-y-4">
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Enter OTP <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleOnChange}
                            placeholder="Enter OTP"
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border"
                        />
                    </label>
                    <button
                        type="submit"
                        className="mt-6 rounded-[8px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    )
}

export default OtpVerification
