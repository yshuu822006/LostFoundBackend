import axios from "axios";

// Base configuration
const BASE_URL = 'http://localhost:9595/lostfound';

// Service URLs - Matching backend controller endpoints
const LOST_URL = `${BASE_URL}/lost`;
const ID_URL = `${BASE_URL}/lost-id`;
const USR_URL = `${BASE_URL}/lost-user`;
// Service for Lost Item API calls


	    export const saveLostItem=(lostItem) => {
		    return axios.post(LOST_URL,lostItem,{
            withCredentials: true
        });
}

	    export const getAllLostItems=() => {
	        return axios.get(LOST_URL,{
            withCredentials: true
        });
	    }

	    export const getLostItemById=(Id) => {
	        return axios.get(`${LOST_URL}/${Id}`,{
            withCredentials: true
        });
	    }

	    export const deleteLostItemById=(lostItemId) => {
	    	return axios.delete(`${LOST_URL}/${lostItemId}`,{
            withCredentials: true
        });
	    }

        export const updateLostItem=(lostItem) => {
        return axios.post(LOST_URL,lostItem,{
            withCredentials: true
        });
    }

	    export const generateLostItemId=() => {
	         return axios.get(ID_URL,{
            withCredentials: true
        });
	    }

	     export const getLostItemsByUsername=() => {
	        return axios.get(USR_URL,{
            withCredentials: true
        });
	    }