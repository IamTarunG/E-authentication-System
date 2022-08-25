import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from '../features/verifyotp/verifySlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Verify() {
    const [otp, setOTP] = useState('')
    const handleChange = (e) => {
        setOTP(e.target.value)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSuccess, isError, verifyResp, message, isLoading } = useSelector((state) => state.verifyOTP)
    const verify = () => {
        console.log(verifyResp)
        // if (isLoading) {
        //     console.log('Loading')
        // }
        if (isError) {
            console.log(message);
        }
        if (isSuccess || verifyResp) {
            navigate("/");
            console.log(message)
        }

        dispatch(verifyOTP(otp))
    }
    // if (isLoading) {
    //     return (
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // }
    return (
        <div>
            <input type="text" value={otp} onChange={handleChange} />

            <button>Resend</button>
            <button onClick={verify}>Verify</button>
        </div>
    )
}

export default Verify