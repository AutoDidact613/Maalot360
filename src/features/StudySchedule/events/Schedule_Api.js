import { config } from '../../../web_config'
import axios from 'axios';


console.log("config", config);

const PATHE = config.SERVER_PATH + "/event";  
const PATHU = config.SERVER_PATH + "/update";  

export const getAllEvent = async () => {

    try {
        const res = await axios.get(`${PATHE}/getAll`)
        return res.data;
    }
    catch (e) {
        throw e;
    }
}

export const addEventApi = async (new_event) => {
    try {
        const res = await axios.post(`${PATHE}/add`, new_event );
        return res.data;
    }
    catch (e) {
        throw e;
    }
}
export const deleteEventApi = async (_id) => {
    try {
        const res = await axios.delete(`${PATHE}/delete/${_id}`);
        return res.data;
    } catch (e) {
        throw e;
    }
};

export const updateEventApi = async(update_event,id)=>{
    try{
        const res = await axios.put(`${PATHE}/update/${id}`, update_event );
        return res.data;
    }
    catch(e){
        throw e;
    }

}
export const getAllUpdates = async () => {

    try {
        const res = await axios.get(`${PATHU}/getAll`)
        return res.data;
    }
    catch (e) {
        throw e;
    }
}

export const addUpdateApi = async (new_update) => {
    try {
        const res = await axios.post(`${PATHU}/add`, new_update );
        return res.data;
    }
    catch (e) {
        throw e;
    }
}
export const deleteUpdateApi = async (_id) => {
    try {
        const res = await axios.delete(`${PATHU}/delete/${_id}`);
        return res.data;
    } catch (e) {
        throw e;
    }
};

export const updateUpdateApi = async (_id, update) => {
  try {
    const res = await axios.put(`${PATHU}/update/${_id}`, update);
    return res.data;
  } catch (e) {
    throw e;
  }
};