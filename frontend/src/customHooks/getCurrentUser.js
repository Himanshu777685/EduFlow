

import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const getCurrentUser = () => {

    const dispatch = useDispatch()
  useEffect (()=>{
    const FetchUser = async () => {
        try {
            const result = await axios.get(serverURL + "/api/user/getcurrentuser" , {withCredentials: true})

            dispatch(setUserData(result.data))

        } catch (error) {

            console.log(error);
            dispatch(setUserData(null));
            
        }
    }

    FetchUser()
  },[])
}

export default getCurrentUser
