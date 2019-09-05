import { createReducer } from "typesafe-actions";
import { DictionaryState, DictionaryActions } from "./types";

const initialDictionaryState: DictionaryState = {
  dictionaries: [] // TODO: Read from localStorage
};

const dictionaryReducer = createReducer<DictionaryState, DictionaryActions>(initialDictionaryState);

export { initialDictionaryState, dictionaryReducer };
