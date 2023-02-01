import axios from "axios";


const requsets = axios.create({
    timeout: 60 * 1000,
});

//请求拦截器
requsets.interceptors.request.use(
    config =>{
            config.headers!['Authorization'] = localStorage["token"];
        return config
    }
);

//响应拦截器
requsets.interceptors.response.use(
    response => {
        if (response.headers.authorization != null) {
            localStorage.setItem("token", response.headers.authorization);
        }
        return response.data;
    },
    error => {
        console.log("response error", error);
        return Promise.reject(error);
    }
);

export function get(url: any, req: any) {
    return requsets.get(url, req)
}

export function post(url: any, req: any) {
    return requsets.post(url, req)
}

export function put(url: any, req: any) {
    return requsets.put(url, req)
}

export function del(url: any, req: any) {
    return requsets.delete(url, req)
}

export default requsets;