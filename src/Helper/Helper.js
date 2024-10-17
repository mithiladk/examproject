import axios from 'axios';

let adminUrl = "https://api.coincap.io/v2"
if(process.env?.REACT_APP_ENV === "production"){
    adminUrl = "https://api.coincap.io/v2"

}

export const baseURL = adminUrl;

let axiosInstance = axios.create({
    baseURL
})


export default axiosInstance;