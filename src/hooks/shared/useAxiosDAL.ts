import React from 'react'
import axios from 'axios'
import useLocalStorage from '../shared/useLocalStorage';

export function useAxiosDAL() {

    const { GetItem } = useLocalStorage();

    const token = GetItem('jwt');

    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }

    // get
    function Get(url: string, params?: object) {
        return axios.get(url, { ...config, ...params })
    }
    // post
    function Post(url: string, data: any, params?: object) {
        return axios.post(url, data, { ...config, ...params })
    }
    // delete
    function Delete(url: string, params?: object) {
        return axios.delete(url, { ...config, ...params })
    }


    return {
        Get,
        Post,
        Delete
    }
}
