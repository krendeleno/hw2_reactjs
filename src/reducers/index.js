import buildsReducer from './builds'
import settingsReducer from './settings'
import {combineReducers} from "redux";

const allReducers = combineReducers({
    buildsReducer,
    settingsReducer
})

export default allReducers;