import React, { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import QRCode from 'qrcode';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getOTP, reset } from '../features/otp/otpSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
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

            dispatch(reset())

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
    // const [error, setError] = useState(false)
    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(user.email);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
            toast('Cannot Generate QR Code')

        }
    }
    const handleScanImage = (e) => {
        setFile(e.target.files[0])

    }
    const handleSubmit = () => {
        QrScanner.scanImage(file).then((res) => {
            props.setResult(res)
            toast('Done!!')
        }).catch((err) => {

            toast('No QRCode Found')
        })
    }


    if (isLoading) {
        return (
            <Spinner />
        )
    }
    return (
        <div className='ml-96 my-56'>


            {/* <input label="Enter Text Here" onChange={(e) => setText(e.target.value)} /> */}
            <p className='text-lg'>Click the generate button below to generate QR Code</p>
            <br />
            <button onClick={() => generateQrCode()} className="bg-blue-400 rounded text-white py-2 px-3">Generate</button>
            <br />
            <br />
            {imageUrl ? (
                <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                </a>) : null}
            <input type="file" onChange={handleScanImage} />
            <br />
            <br />
            <button onClick={handleSubmit} className="bg-gray-600 text-white rounded px-3 py-2">Scan Image</button>

            <br />
            <br />
            <button onClick={sendOTP} className="bg-green-600 text-white rounded px-3 py-2">Send OTP</button>

        </div>
    );
}


export default App;