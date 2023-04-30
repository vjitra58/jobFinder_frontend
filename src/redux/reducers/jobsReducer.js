
import { createReducer } from "@reduxjs/toolkit";

export const jobsReducer = createReducer(
  { jobs: [], loading: false },
  {
    // get all jobs
    getAllJobsRequest: (state) => {
      state.loading = true;
    },
    getAllJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload.job;
    },
    getAllJobsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // create job
    createJobRequest: (state, action)=>{
        state.loading = true;
    },
    createJobSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    createJobFail: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    // get job details
    getjobDetailsRequest: (state) => {
      state.loading = true;
    },
    getjobDetailsSuccess: (state, action) => {
      state.loading = false;
      state.jobDetail = action.payload.job;
    },
    getjobDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update job
    updateJobRequest: (state) => {
      state.loading = true;
    },
    updateJobSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateJobFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete job
    deleteJobRequest: (state) => {
      state.loading = true;
    },
    deleteJobSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteJobFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // clear error and message
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);