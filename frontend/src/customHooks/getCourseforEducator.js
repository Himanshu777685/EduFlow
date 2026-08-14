import axios from 'axios'
import React from 'react'
import { serverURL } from '../App'
import { useState } from 'react'
import { useEffect } from 'react'

const getCourseforEducator = ({ courseId }) => {

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);

                const result = await axios.get(
                    `${serverURL}/api/course/getCourseforCreator/${courseId}`,
                    {
                        withCredentials: true
                    }
                );

                console.log("from for educator hook")
                console.log(result)
                setCourse(result.data.course);
                
            } catch (error) {
                setError(
                    error.response?.data?.message || "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    return {
        course,
        loading,
        error
    }

}

export default getCourseforEducator
