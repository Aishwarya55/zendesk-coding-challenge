import axios from "axios"
import BASE_URL from "../environment"
import {
    GET_PRICE_SUCCESS,
    GET_PRICE_FAILURE,
    GET_CURRENT_SUBSCRIPTION_SUCCESS,
    GET_CURRENT_SUBSCRIPTION_FAILURE,
    UPDATE_SUBSCRIPTION_FAILURE,
    UPDATE_SUBSCRIPTION_SUCCESS,
    ASYNC_CALL_STARTED
} from "./types"


axios.defaults.headers.common["Content-Type"]="application/json";


const ayncCallStarted = () => ({
    type: ASYNC_CALL_STARTED
  });

//Fetch Cost preview from Backend server
export const getPrice = (data) => async (dispatch) => {
    dispatch(ayncCallStarted())
    const response = await axios.post(`${BASE_URL}/preview`, data)

    if(response.status === 200){
        dispatch({
            type: GET_PRICE_SUCCESS,
            payload: response.data
        })
    }else{
        dispatch({
            type: GET_PRICE_FAILURE,
            payload: response.data
        })
    }
}

//Fetch Current Subscription from Backend server
export const getCurrentSubscription = () => async(dispatch) => {
    dispatch(ayncCallStarted())
    const response = await axios.get(`${BASE_URL}/current`)

    if(response.status === 200){
        dispatch({
            type: GET_CURRENT_SUBSCRIPTION_SUCCESS,
            payload: response.data
        })
    }else{
        dispatch({
            type: GET_CURRENT_SUBSCRIPTION_FAILURE,
            payload: response.data
        })
    }
}

//Update current subscription in backend server
export const updateSubscription = (data) => async(dispatch) => {
    dispatch(ayncCallStarted())
    const response = await axios.put(`${BASE_URL}/current`, data)

    if(response.status === 200){
        dispatch({
            type: UPDATE_SUBSCRIPTION_SUCCESS,
            payload: response.data
        })
    }else{
        dispatch({
            type: UPDATE_SUBSCRIPTION_FAILURE,
            payload: response.data
        })
    }

}
