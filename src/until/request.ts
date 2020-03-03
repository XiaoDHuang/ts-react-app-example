import originAxios from 'axios';
import { message } from 'antd';

const axios = originAxios.create({
    timeout: 2000
});

axios.interceptors.response.use((res) => {
    if (res.data && res.data.flag === 1) {
        let errorMsg = res.data.msg;
        message.error(errorMsg);
        return Promise.reject(errorMsg);
    }

    return res.data;
}, (error) => {
    return Promise.reject(error);
});

export function get(url: string, data: any) {
    return axios.get(url, {
        params: data
    });
}

export function post(url: string, data: any) {
    return axios({
        method: 'post',
        url,
        data
    });
}

export default axios;
