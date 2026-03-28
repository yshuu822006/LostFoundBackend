import axios from "axios";

const BASE_URL = 'http://localhost:9595/lostfound';


const FOUND_URL = `${BASE_URL}/found`;
const ID_URL = `${BASE_URL}/found-id`;
const USR_URL = `${BASE_URL}/found-user`;


export const saveFoundItem = (foundItem) => {
    return axios.post(FOUND_URL, foundItem, {
        withCredentials: true
    });
};

export const getAllFoundItems = () => {
    return axios.get(FOUND_URL, {
        withCredentials: true
    });
};


export const getFoundItemById = (id) => {
    return axios.get(`${FOUND_URL}/${id}`, {
        withCredentials: true
    });
};


export const deleteFoundItemById = (foundItemId) => {
    return axios.delete(`${FOUND_URL}/${foundItemId}`, {
        withCredentials: true
    });
};


export const updateFoundItem = (foundItem) => {
    return axios.post(FOUND_URL, foundItem, {
        withCredentials: true
    });
};


export const generateFoundItemId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
};


export const getFoundItemsByUsername = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
};


export const getFoundItemsByLostItem=(id)=>{
    return axios.get(`${ID_URL}/${id}`, {
        withCredentials: true
    });
};
