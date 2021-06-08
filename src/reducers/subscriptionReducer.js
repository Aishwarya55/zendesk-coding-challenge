import {
    GET_PRICE_SUCCESS,
    GET_PRICE_FAILURE,
    GET_CURRENT_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_FAILURE,
    ASYNC_CALL_STARTED
} from "./../actions/types"


export const initialState = {
    loading: false,
    costPreview: {

        plan: "",
        name: "",
        seats: 0,
        cost: ""

    },
    currentSubscription: {
        plan: "basic",
        name: "Basic",
        seats: 0,
        cost: ""
    },
    previousSubscription: {
        plan: "basic",
        name: "Basic",
        seats: 0,
        cost: ""
    }
}


export default function subscriptionReducer(state = initialState, action) {

    switch (action.type) {
        case ASYNC_CALL_STARTED:
            return { ...state, loading: true}
        case GET_PRICE_SUCCESS:
            return { ...state, costPreview: action.payload, loading: false }
        case GET_PRICE_FAILURE:
            return { ...state }
        case GET_CURRENT_SUBSCRIPTION_SUCCESS:
            return { ...state, currentSubscription: action.payload, loading: false }
        case UPDATE_SUBSCRIPTION_SUCCESS:
            return {...state, previousSubscription: state.currentSubscription, currentSubscription: action.payload, loading: false}
        case UPDATE_SUBSCRIPTION_FAILURE:
            return {...state}
        default:
            return { ...state }
    }

}