import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";
function Verify(props) {
    // const [otp, setOTP] = useState('')
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const handleChange = (e) => {
        props.setOTP(e.target.value)
    }

    const { user } = useSelector(
        (state) => state.auth
    );
    const { isSuccess, isError, otpResp, message, isLoading } = useSelector((state) => state.otp)
    useEffect(() => {
        if (isLoading) {
            console.log('Loading...')
        }
        if (isError) {
            console.log(message);
        }
        if (isSuccess || otpResp) {
            console.log(otpResp)
            toast('OTP sent Successfully')


        }
    }, [isSuccess, isError, otpResp, message, isLoading])
    const verifyUser = () => {
        if (otpResp.otp === props.otp && props.result === user.email) {
            navigate('/', { replace: false })
            toast('Logged in Successfully')
        }
        else {
            console.log('Wrong QRcode or otp')
            toast("Wrong QRcode or OTP")
        }
    }
    if (isLoading) {
        return (
            <Spinner />
        )
    }
    return (
        <div className="flex flex-col h-screen justify-evenly items-center">

            <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-60 justify-evenly w-1/5">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    onChange={handleChange}
                    value={props.otp}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {/* <button onClick={resend}>Resend</button> */}
                <button onClick={verifyUser} className="bg-green-600 text-white rounded px-3 py-2">Verify</button>
            </div>
        </div>
    )
}

export default Verify