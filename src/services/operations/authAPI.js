import axios from "axios";
import { setLoading, setToken, setUser,setSignupData } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
const OTP_API = "http://localhost:5000/api/users/send-otp";
const SIGNUP_API = "http://localhost:5000/api/users/signup";
const LOGIN_API = "http://localhost:5000/api/users/login";
const UPDATE_PROFILE_API= "http://localhost:5000/api/users/updateProfile"
export const sendOtp = (email) => async () => {
    console.log(email);
    try {
        const response = await axios.post(OTP_API, { email });
        return response.data;
    } catch (error) {
        console.error("Error sending OTP", error);
    }
};

export async function verifyOtp(firstName,
    lastName,
    email,
    password,
    confirmPassword, otp)
{    console.log("data ",firstName,
lastName,
email,
password,
confirmPassword, otp)
    try {
        const response = await axios.post(SIGNUP_API, {firstName,
            lastName,
            email,
            password,
            confirmPassword, otp}, { withCredentials: true });
        console.log("Server response:", response.data);  // Log server response
        if (response.status !== 200) {
            throw new Error(response.data.message || "Failed to verify OTP");
        }
        return response.data;
    } catch (error) {
        console.error("Error verifying OTP", error);
        throw error;  
    }
}


export function signUp(firstName, lastName, email, password, confirmPassword, otp, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log(response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            navigate("/login");
        } catch (err) {
            console.log(err);
            navigate("/signup");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser({ ...response.data.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };
}

export function updateProfile(token, formData) {
    console.log(formData)
    console.log(token)
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      console.log(formData)
      try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
          Authorisation: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        console.log(response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        // const userImage = response.data.updatedUserDetails.image
        //   ? response.data.updatedUserDetails.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        // dispatch(
        //   setUser({ ...response.data.updatedUserDetails, image: userImage })
        // )
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }