import axios from "axios";
import errorHandler from "./errorHandler";

const instance = axios.create({
    baseURL: `${process.env.NEXT_LOCAL_API_HOST}`,
});

instance.interceptors.response.use((response) => response.data, errorHandler);

export default instance;
