import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_APP_API_BASE_URL + '/api',
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


function extractErrorMessages(error) {
    const apiErrors = error?.response?.data?.errors;
    if (Array.isArray(apiErrors) && apiErrors.length) {
        return apiErrors.map(function (item) {
            return item.msg || "Request failed";
        });
    }
    if (error?.response?.data?.msg) {
        return [error.response.data.msg];
    }
    return ["Server error"];
}

export { axiosInstance as default, extractErrorMessages };