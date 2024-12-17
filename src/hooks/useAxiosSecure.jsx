import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { signOutUser } = useAuth();

    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        // console.log('interceptor', error.status);
        if (error.status === 401 || error.status == 403) {
            signOutUser()
                .then(() => {
                    console.log('user logged out in interceptor');
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
        return Promise.reject(error);
    })

    return axiosInstance;
};

export default useAxiosSecure;