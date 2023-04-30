import axios from "axios";
import { server } from "../store.js";

export const getAlljobs =
  (cat = "", key = "") =>
  async (dispatch) => {
    
    console.log("calling getalljobs with ", key, cat);

    try {
      dispatch({
        type: "getAllJobsRequest",
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },

        // withCredentials: true,
      };

      const { data } = await axios.get(
        `${server}/alljobs?keyword=${key}&category=${cat}`,
        config
      );

      dispatch({
        type: "getAllJobsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllJobsFail",
        payload: error.response.data.message,
      });
    }
  };






export const createJobpost = (formvalues) => async (dispatch) => {

    try {
        dispatch({
          type: "createJobRequest",
        });
    
        const config = {
        headers: {
            "Content-type": "application/json",
        },
    
        withCredentials: true,
        };
    
        const { data } = await axios.post(`${server}/create`, formvalues ,config);
    
        dispatch({
          type: "createJobSuccess",
          payload: data.message,
        });
    } catch (error) {
        dispatch({
          type: "createJobFail",
          payload: error.response.data.message,
        });
    }

}

export const updateJobpost = (formvalues, id) => async (dispatch) => {

    try {
        dispatch({
          type: "updateJobRequest",
        });
    
        const config = {
        headers: {
            "Content-type": "application/json",
        },
    
        withCredentials: true,
        };
    
        const { data } = await axios.put(`${server}/job/${id}`, formvalues ,config);
    
        dispatch({
          type: "updateJobSuccess",
          payload: data.message,
        });
    } catch (error) {
        dispatch({
          type: "updateJobFail",
          payload: error.message,
        });
    }

}

export const getjobDetails = (id) => async (dispatch) => {

    try {
        dispatch({
        type: "getjobDetailsRequest",
        });
    
        const config = {
        headers: {
            "Content-type": "application/json",
        },
    
        withCredentials: true,
        };
    
        const { data } = await axios.get(`${server}/job/${id}`, config);
    
        dispatch({
        type: "getjobDetailsSuccess",
        payload: data,
        });
    } catch (error) {
        dispatch({
        type: "getjobDetailsFail",
        payload: error.message,
        });
    }

}


export const deleteJob = (id) => async (dispatch) => {

    try {
        dispatch({
          type: "deleteJobRequest",
        });
    
        const config = {
        headers: {
            "Content-type": "application/json",
        },
    
        withCredentials: true,
        };
    
        const { data } = await axios.delete(`${server}/job/${id}`, config);
    
        dispatch({
          type: "deleteJobSuccess",
          payload: data.message,
        });
    } catch (error) {
        
        dispatch({
          type: "deleteJobFail",
          payload: error.message,
        });
    }



}




