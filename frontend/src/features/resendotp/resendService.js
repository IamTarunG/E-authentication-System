import axios from "axios";

// const API_URL = "http://localhost:5000/users";

const resndOTP = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get("http://localhost:5000/users/resendotp", config);
    console.log(response)
    return response.data;
};

const resendService = {
    resndOTP
};

export default resendService;