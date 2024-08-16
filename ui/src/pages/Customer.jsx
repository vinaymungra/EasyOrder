import React, { useEffect } from 'react'
import { setData } from '../redux/slices/cutomer';
import { useDispatch } from 'react-redux';
import { getMenu } from '../services/middlewares/customer';

const Customer = ({bussinessId,table}) => {

    const dispatch=useDispatch()
    useEffect(async()=>{

        let result=await dispatch(getMenu({bussinessId}))
        dispatch(setData(result));
    },[])
    return (
        <div>
            
        </div>
    )
}

export default Customer