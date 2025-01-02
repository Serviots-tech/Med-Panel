/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { configData } from './helpers/config';

const endPoint = configData.baseURL;

const apiConfig = (flag = false) => {
	if (localStorage.getItem('accessToken')) {
		return {
			headers: {
				Authorization: `bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': flag
					? 'multipart/form-data'
					: 'application/json',
			},
			method: 'PUT,DELETE,POST,GET,OPTION',
		};
	}
	return { withCredentials: false };
};

export const getApi = (url?: string, params?: any) => {
	return axios.get(`${endPoint}${url}`, {
		params: params,
		...apiConfig(),
	});
};


export const postApi = (url: string, apiData?: any, flag?: boolean) => {
	return axios.post(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApi = (url: string, apiData: any, flag?: boolean) => {
	return axios.put(`${endPoint}${url}`, apiData, apiConfig(flag));
};



export const deleteApiWithData = (url: string, apiData?: any) => {
	return axios.delete(`${endPoint}${url}`, {
		data: apiData,
		...apiConfig(),
	});
};