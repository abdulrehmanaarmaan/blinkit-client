import axios from 'axios';
import React from 'react';

const useAxios = () => {

    const API = import.meta.env.VITE_API_URL

    const instance = axios.create({
        baseURL: API
    });

    return instance
};

export default useAxios;