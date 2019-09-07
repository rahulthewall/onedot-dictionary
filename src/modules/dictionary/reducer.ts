import { createReducer } from 'typesafe-actions';
import { clone, merge, mergeWith, isNil } from 'lodash';

import {
  DictionaryState,
  DictionaryActions,
  Dictionary,
  IDictionary,
  IDictionaryPair,
} from './types';

// Read existing list of dictionaries
const dictionaries = JSON.parse(localStorage.getItem('dictionaries') || '[]') as IDictionary[];

const initialDictionaryState: DictionaryState = {
  dictionaries,
};

const dictionaryReducer = createReducer<DictionaryState, DictionaryActions>(
  initialDictionaryState,
  {
    [Dictionary.ADD_DICTIONARY]: (state, action) => {
      const updatedDictionaries = clone(state.dictionaries);
      updatedDictionaries.push(action.payload);

      // Save to local state
      localStorage.setItem('dictionaries', JSON.stringify(updatedDictionaries));

      return merge(state, {
        dictionaries: updatedDictionaries,
      });
    },
    [Dictionary.REMOVE_DICTIONARY]: (state, action) => {
      const currentDictionaries = clone(state.dictionaries);
      const updatedDictionaries = currentDictionaries.filter(
        (dictionary) =>
          dictionary.name !== action.payload.name && dictionary.id !== action.payload.id
      );

      // Save to local state
      localStorage.setItem('dictionaries', JSON.stringify(updatedDictionaries));

      return mergeWith(state, { dictionaries: updatedDictionaries }, (obj, src) => {
        if (!isNil(src)) {
          return src;
        }
        return obj;
      });
    },
    [Dictionary.LOAD_DICTIONARY]: (state, action) => {
      const id = action.payload;

      // Read dictionary (if it exists) from local storage
      const dictionary = JSON.parse(localStorage.getItem(id) || '[]') as IDictionaryPair[];

      return merge(state, {
        currentDictionary: dictionary,
      });
    },
    [Dictionary.ADD_DICTIONARY_PAIR]: (state, action) => {
      const currentPairs = state.currentDictionary ? clone(state.currentDictionary) : [];
      currentPairs.push({
        ...action.payload.pair,
        editMode: false,
        errors: [], // TODO: Add errors
      });

      // Save in local storage
      localStorage.setItem(action.payload.dict.id, JSON.stringify(currentPairs));

      return merge(state, {
        currentDictionary: currentPairs,
      });
    },
    [Dictionary.REMOVE_DICTIONARY_PAIR]: (state, action) => {
      const currentPairs = state.currentDictionary ? clone(state.currentDictionary) : [];
      const updatedPairs = currentPairs.filter((pair) => pair.id !== action.payload.pair.id);

      // Save in location storage
      localStorage.setItem(action.payload.dict.id, JSON.stringify(updatedPairs));

      return mergeWith(state, { currentDictionary: updatedPairs }, (obj, src) => {
        if (!isNil(src)) {
          return src;
        }
        return obj;
      });
    },
  }
);

export { initialDictionaryState, dictionaryReducer };
