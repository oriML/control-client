import React from 'react'
import axios from 'axios'
import useLocalStorage from './useLocalStorage';

export function useAxiosDAL() {

    const { GetItem } = useLocalStorage();

    const token = GetItem('jwt');

    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }

    // get
    function Get(url: string) {
        return axios.get(url, config)
    }
    // post
    function Post(url: string, data: any) {
        return axios.post(url, data, config)
    }
    // delete
    function Delete(url: string) {
        return axios.delete(url, config)
    }


    return {
        Get,
        Post,
        Delete
    }
}
