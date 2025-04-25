import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json";
        return config;
    }
);

instance.interceptors.response.use((response) => response);

export const getProducts = async () => {
    const response = await instance.get("/list");
    return response.data;
}

export const createProduct = async (data: FormData) => {
    const response = await instance.post("/products", data);
    return response.data;
}