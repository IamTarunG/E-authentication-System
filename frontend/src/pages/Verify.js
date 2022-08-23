import { useState } from 'react'

function Verify() {
    const [otp, setOTP] = useState()
    return (
        <div>
            <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />

            <button>Resend</button>
            <button>Verify</button>
        </div>
    )
}

export default Verify