import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import { getPrice, getCurrentSubscription, updateSubscription } from "./../actions"
import fetchMock from 'fetch-mock'
import * as types from "../actions/types"
import * as actions from "../actions"
import BASE_URL from "../environment"
import "../mock-server";
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('action creators', () => {

    afterEach(() => {
        fetchMock.restore()
    })
    it('dispatches GET_PRICE_SUCCESS when price is fetched successfully', () => {

        fetchMock.postOnce(`${BASE_URL}/preview`, {
            body: {
                plan: "good",
                seats: "5"
            }
        })

        const expectedActions = [
            {
                type: types.ASYNC_CALL_STARTED
            },
            {
                type: types.GET_PRICE_SUCCESS,
                payload: {
                    plan: "good",
                    name: "Good",
                    seats: "5",
                    cost: 50
                }
                
            }

        ]

        const store = mockStore({ costPreview: {} })

        return store.dispatch(actions.getPrice({

            plan: "good",
            seats: "5"

        })).then(() => {
            console.log(store.getActions())

             expect(store.getActions()).toEqual(expectedActions)
        })

    })


    it('dispatches GET_CURRENT_SUBSCRIPTION when current sunbscription is fetched successfully', () => {
        fetchMock.getOnce(`${BASE_URL}/current`, {})

        const expectedActions = [
            {
                type: types.ASYNC_CALL_STARTED
            },
            {
            type: types.GET_CURRENT_SUBSCRIPTION_SUCCESS,
            payload: {
                    id: "2",
                    plan: "good",
                    name: "Good",
                    seats: 5,
                    cost: 50
                }
            }
        ]
        const store = mockStore({ currentSubscription: {} })

        return store.dispatch(actions.getCurrentSubscription()).then(() => {

            expect(store.getActions()).toEqual(expectedActions)
        })

    })

    it('dispatches UPDATE_SUBSCRIPTION_SUCCESS when subscription is updated and changes current and previous subscription in store accordingly', () => {

        fetchMock.putOnce(`${BASE_URL}/current`, {
            body: {
             
                plan: "basic",
                name: "Basic",
                seats: "5",
                cost: 5
            }
        })

        const expectedActions = [
            {
                type: types.ASYNC_CALL_STARTED
            },
            {
            type: types.UPDATE_SUBSCRIPTION_SUCCESS,
            payload: {
             
                    plan: "basic",
                    name: "Basic",
                    seats: 5,
                    cost: 5
                }
            }
        ]

        const store = mockStore({ currentSubscription: {}, previousSubscription: {} })

        return store.dispatch(actions.updateSubscription({
            plan: "basic",
            name: "Basic",
            seats: 5,
            cost: 5
        })).then(() => {

            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})