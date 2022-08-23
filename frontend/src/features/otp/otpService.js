import axios from "axios";

// const API_URL = "http://localhost:5000/users";

const getOTP = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get("http://localhost:5000/users/sendotp", config);
    return response.data;
};

const otpService = {
    getOTP
};

export default otpService;