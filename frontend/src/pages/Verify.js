import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
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
    const { otpResp, isLoading } = useSelector((state) => state.otp)
    const verifyUser = () => {
        if (otpResp.otp === props.otp && props.result === user.email) {
            navigate('/')
        }
        else {
            console.log('Wrong QRcode or otp')
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
            <input type="text" value={props.otp} onChange={handleChange} />

            {/* <button onClick={resend}>Resend</button> */}
            <p>{props.otp}</p>
            <button onClick={verifyUser}>Verify</button>
        </div>
    )
}

export default Verify