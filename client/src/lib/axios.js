import axios from "axios";
import useErrorStore from "../store/errorStore";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 600000,
});

api.interceptors.response.use(
  (response) => {
    useErrorStore.getState().clearNetworkError();
    return response;
  },
  (error) => {
    if (!error.response) {
      useErrorStore
        .getState()
        .setNetworkError("Unable to reach the server. Please try again later.");
    }
    return Promise.reject(error);
  },
);

export default api;
