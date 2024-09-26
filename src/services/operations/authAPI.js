import { authEndpoints, dashBoardEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setToken, setLoading, setLogin } from "../../slices/userSlice";
import toast from "react-hot-toast";
import {setUser} from "../../slices/profileSlice";

const {LOGIN, SIGN_UP} = authEndpoints;
const {GET_ALL_COUNT} = dashBoardEndpoints;

export function login (email, password, navigate, setIsLoggedIn) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading ....");
        dispatch(setLoading(true))
        try {   
            const response = await apiConnector("POST", LOGIN, {
                email, password,
            })

            console.log("Calling login api");
            //console.log(response)

            if (!response.data.success) {
                toast.error("Login Failed")
                throw new Error(response.data.message)
            }

            toast.success("Login successfully");

            dispatch(setToken(response.data.token));
            dispatch(setUser({ ...response.data.user}))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/");
            setIsLoggedIn(false);
        } catch(error) {
            console.log(error);
            toast.error(error.response.data.message);
            setIsLoggedIn(false)
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getCount(userId) {
    return async () => {
        try {

            const response = await apiConnector("POST", GET_ALL_COUNT, {
                userId
            });


            if (!response.data.success) {
                console.log(response.data.message);
                throw new Error(response.data.message);
            }
            
            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }