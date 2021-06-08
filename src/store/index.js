import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Reducer from "../reducers"

const thunkMiddleware = applyMiddleware(thunk);

const state = createStore(Reducer, thunkMiddleware)

export default state;
