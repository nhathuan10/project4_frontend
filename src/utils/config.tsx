import { createBrowserHistory } from "@remix-run/router";
import axios from "axios";

export const DOMAIN = 'http://localhost:8080'

export const history = createBrowserHistory({ v5Compat: true })

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
})

// config all response
http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 400 || error.response?.status === 404) {
        history.push('/search-books')
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
        history.push('/search-books')
    }
    return Promise.reject(error);
});