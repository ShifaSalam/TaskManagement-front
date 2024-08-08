import { commonApi } from "./commonApi";
import base_url from "./base_url";

// AUTHENTICATION

// register
export const userRegister=async(data)=>{
    return await commonApi("POST",`${base_url}/register`,data,"")
}

// Login
export const userLogin=async(data)=>{
    return await commonApi("POST",`${base_url}/login`,data,"")
}

// TASKS

// get all Tasks of specific users
export const allTasks=async(header)=>{
    return await commonApi("GET",`${base_url}/allTasks`,"",header)
}

// get one task detail
export const singleTask=async(tid,header)=>{
    return await commonApi("GET",`${base_url}/oneTask/${tid}`,"",header)
}

// add one task
export const addTask=async(data,header)=>{
    return await commonApi("POST",`${base_url}/add`,data,header)
}

// to edit tasks
export const editTask=async(id,data,header)=>{
    return await commonApi("PUT",`${base_url}/editTask/${id}`,data,header)
}

// delete tasks
export const deleteTask=async(id,header)=>{
    return await commonApi("DELETE",`${base_url}/deleteTask/${id}`,{},header)
}

// Update task completion status
export const updateCompletion =async (id, data, header) => {
    return await commonApi("PUT",`${base_url}/completeTask/${id}`,data,header);
}

// get all completed Tasks of specific users
export const completedTask=async(header)=>{
    return await commonApi("GET",`${base_url}/completedTasks`,"",header)
}