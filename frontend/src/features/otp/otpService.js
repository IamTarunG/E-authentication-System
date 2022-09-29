import axios from "axios";

// const API_URL = "http://localhost:5000/users";

const getOTP = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get("https://eauth.onrender.com/users/sendotp", config);
    console.log(response)
    return response.data;
};

const otpService = {
    getOTP
};

export default otpService;