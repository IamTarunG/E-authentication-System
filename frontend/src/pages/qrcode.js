import React, { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import QRCode from 'qrcode';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getOTP, reset } from '../features/otp/otpSlice';

function App(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

        }
        dispatch(reset());
    }, [isError, isLoading, isSuccess, message, otpResp, navigate, dispatch]);
    const sendOTP = () => {
        console.log(otpResp)
        dispatch(getOTP())
        navigate("/verify");

    }
    // const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState()
    // const [result, setResult] = useState()
    const [error, setError] = useState(false)
    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(user.email);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleScanImage = (e) => {
        setFile(e.target.files[0])

    }
    const handleSubmit = () => {
        QrScanner.scanImage(file).then((res) => props.setResult(res)).catch((err) => setError(true))
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

            {/* <input label="Enter Text Here" onChange={(e) => setText(e.target.value)} /> */}
            <button onClick={() => generateQrCode()}>Generate</button>
            <br />
            <br />
            <br />
            {imageUrl ? (
                <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                </a>) : null}
            <br />
            <br />
            <br />
            <input type="file" onChange={handleScanImage} />
            <button onClick={handleSubmit}>Scan Image</button>
            <p>{props.result}</p>
            <p>{error && "No Qrcode found"}</p>
            <button onClick={sendOTP}>Send OTP</button>

        </div>
    );
}


export default App;