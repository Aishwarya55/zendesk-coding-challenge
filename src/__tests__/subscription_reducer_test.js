import subscriptionReducer from "../reducers/subscriptionReducer"
import * as types from "../actions/types"
import {initialState} from "../reducers/subscriptionReducer"

describe('subscription reducer', () => {
    it('should return initial state', () => {
        expect(subscriptionReducer(undefined, {})).toMatchSnapshot()
    })

    it('should handle GET_PRICE_SUCCESS', () => {
        expect(subscriptionReducer({}, {
            type:types.GET_PRICE_SUCCESS,
            payload: {
                plan: "good",
                name: "Good",
                seats: "5",
                cost: 50
            }
        })).toEqual({
            costPreview: {
                plan: "good",
                name: "Good",
                seats: "5",
                cost: 50
            },
            loading: false
        })
    })

    it('it should handle UPDATE_SUBSCRIPTION_SUCCESS', () => {
        expect(subscriptionReducer({}, {
            type: types.UPDATE_SUBSCRIPTION_SUCCESS,
            payload: {
                plan: "best",
                name: "Best",
                seats: "5",
                cost: 5000
            }
        })).toEqual({
       
            currentSubscription: {
                plan: "best",
                name: "Best",
                seats: "5",
                cost: 5000
            },
            loading: false
        })
    })

    it('it should handle GET_CURRENT_SUBSCRIPTION_SUCCESS', () => {
        expect(subscriptionReducer({}, {
            type: types.GET_CURRENT_SUBSCRIPTION_SUCCESS,
            payload: {
                plan: "best",
                name: "Best",
                seats: "5",
                cost: 5000
            }
        })).toEqual({
       
            currentSubscription: {
                plan: "best",
                name: "Best",
                seats: "5",
                cost: 5000
            },
            loading: false
        })
    })

})