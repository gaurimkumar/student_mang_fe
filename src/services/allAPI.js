import { BASEURL } from "./BaseURL"
import axiosConfig from "./axiosConfig"

export const addStudent=async(reqBody)=>{
    return await axiosConfig("post",`${BASEURL}/studentDatas`,reqBody)
}

export const getStudent=async()=>{
    return await axiosConfig("get",`${BASEURL}/studentDatas`,'')
}

export const deletestudent=async(id)=>{
    
    return await axiosConfig('delete',`${BASEURL}/studentDatas/${id}`,'')
}

export const updateStudent=async(id,reqBody)=>{

    return await axiosConfig('put',`${BASEURL}/studentDatas/${id}`,reqBody)
}