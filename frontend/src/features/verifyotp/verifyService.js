import axios from "axios";

// const API_URL = "http://localhost:5000/users";

const verifyOTP = async (inputOTP, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post("http://localhost:5000/users/verifyotp", inputOTP, config);
    return response.data;
};

const verifyService = {
    verifyOTP
};

export default verifyService;