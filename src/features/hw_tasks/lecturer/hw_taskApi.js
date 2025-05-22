import { config } from '../../../web_config'
import axios from 'axios';


console.log("config", config);



const PATH = config.SERVER_PATH + "/task";   //"localhost:3000/tasks"

export const getAllHW_tasks = async () => {

    // axios.get("http://localhost:3000/task/getAll").then(res => {
    //     console.log(res);

    //   }).catch(e => {
    //     alert("שגיאת שרת, נסה במועד מאוחר יותר");
    //     console.log(e);
    //   })
    try {
        const res = await axios.get(`${PATH}/getAll`) //"localhost:3000/tasks/getAll"
        return res.data;
    }
    catch (e) {
        throw e;
    }
}

export const addHW_task = async (new_task) => {
    try {
        const res = await axios.post(`${PATH}/add`, new_task );
        return res.data;
    }
    catch (e) {
        throw e;
    }
}


export const updateHW_task = async(update_task)=>{
    try{
        const res = await axios.put(`${PATH}/update/${update_task._id}`, update_task );
        return res.data;
    }
    catch(e){
        throw e;
    }

}