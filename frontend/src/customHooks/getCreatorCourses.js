import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourses } from '../redux/courseSlice'

const getCreatorCourses = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector((state)=>state.user)
    useEffect(()=>{

        const FetchCreatorCourse = async() =>{
            try {
                const result = await axios.get(serverURL+"/api/course/getCreatorCourse" , {withCredentials: true})

                console.log("Creator course: ")
                console.log(result.data);
                dispatch(setCreatorCourses(result.data));

                
            } catch (error) {
                console.log(error)
                dispatch(null);
            }
        }

        FetchCreatorCourse();
    },[userData])
}

export default getCreatorCourses
