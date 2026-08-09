import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCourses } from '../redux/courseSlice'

const getAllCourses = () => {
  
    const dispatch = useDispatch();
    const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const FetchAllCourses = async() =>{
            try {
    
                const result = await axios.get(serverURL + "/api/course/getPublishedCourses" , {withCredentials : true});

                console.log("all course: ")
                console.log(result.data);
                dispatch(setAllCourses(result.data));

            } catch (error) {
                console.log(error);
                dispatch(setAllCourses(null));
            }
        }
        FetchAllCourses()
    } , [userData])

}

export default getAllCourses
