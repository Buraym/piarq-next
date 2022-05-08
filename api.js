import axios from "axios";

const api = axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 6500,
});

export default api;
