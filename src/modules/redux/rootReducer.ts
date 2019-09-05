import { combineReducers } from "redux";

import {
  dictionaryReducer,
  initialDictionaryState
} from "../dictionary/reducer";

const rootInitialState = {
  dictionaryReducer: initialDictionaryState
};

const rootReducer = combineReducers({
  dictionaryReducer
});

export { rootInitialState, rootReducer };
