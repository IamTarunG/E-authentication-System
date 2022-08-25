import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, reset } from '../features/verifyotp/verifySlice'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Verify() {
    const [otp, setOTP] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setOTP(e.target.value)
    }

    const { isSuccess, isError, verifyResp, message, isLoading } = useSelector((state) => state.verifyOTP)
    const { otpResp } = useSelector((state) => state.otp)
    useEffect(() => {
        // console.log({ data: otpResp })
        // if (isLoading) {
        //     console.log('Loading')
        // }

        // if (isError) {
        //     console.log(verifyResp)
        //     console.log(message);
        // }
        // if (isSuccess || verifyResp) {
        //     navigate("/");
        // }
        dispatch(reset());

        // dispatch(reset());
    }, [navigate, dispatch, isLoading, isError, isSuccess, message, verifyResp]);
    const verifyUser = () => {
        console.log(otpResp)
        if (otpResp.otp === otp) {
            navigate('/')
        }

    }
    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div>
            <input type="text" value={otp} onChange={handleChange} />

            <button>Resend</button>
            <p>{otp}</p>
            <button onClick={verifyUser}>Verify</button>
        </div>
    )
}

export default Verify