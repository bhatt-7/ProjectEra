import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
    console.log("ye hai", url);
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData,
        headers,
        params,

    });

}
axiosInstance.defaults.withCredentials = true;