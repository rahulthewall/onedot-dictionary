import { createReducer } from 'typesafe-actions';
import { clone, merge, mergeWith, isNil } from 'lodash';

import {
  DictionaryState,
  DictionaryActions,
  Dictionary,
  IDictionary,
  IDictionaryPair,
  IDictionaryListItem,
  ConsistencyIssues,
} from './types';

// Read existing list of dictionaries
const dictionaries = JSON.parse(localStorage.getItem('dictionaries') || '[]') as IDictionary[];

const initialDictionaryState: DictionaryState = {
  dictionaries,
};

const checkConsistency = (dictPairs: IDictionaryListItem[]) => {
  return dictPairs.map((dictPair) => {
    const errors: ConsistencyIssues[] = [];
    const restPairs = dictPairs.filter((pair) => pair.id !== dictPair.id);

    // Check for duplicates
    if (
      restPairs.some((pair) => pair.domain === dictPair.domain && pair.range === dictPair.range)
    ) {
      errors.push(ConsistencyIssues.DUPLICATES);
    }

    // Check for forks
    if (
      restPairs.some((pair) => pair.domain === dictPair.domain && pair.range !== dictPair.range)
    ) {
      errors.push(ConsistencyIssues.FORKS);
    }

    // Check for cycles
    if (
      restPairs.some((pair) => pair.domain === dictPair.range && pair.range === dictPair.domain)
    ) {
      errors.push(ConsistencyIssues.CYCLES);
    }

    // Check for chains
    if (
      restPairs.some((pair) => pair.domain === dictPair.range && pair.range !== dictPair.domain)
    ) {
      errors.push(ConsistencyIssues.CHAINS);
    }

    // No error
    if (errors.length === 0) {
      errors.push(ConsistencyIssues.NONE);
    }

    return {
      ...dictPair,
      errors,
    };
  });
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
        errors: [],
      });

      // Check for errors
      const withErrors = checkConsistency(currentPairs);

      // Save in local storage
      localStorage.setItem(action.payload.dict.id, JSON.stringify(withErrors));

      return merge(state, {
        currentDictionary: withErrors,
      });
    },
    [Dictionary.REMOVE_DICTIONARY_PAIR]: (state, action) => {
      const currentPairs = state.currentDictionary ? clone(state.currentDictionary) : [];
      const updatedPairs = currentPairs.filter((pair) => pair.id !== action.payload.pair.id);

      // Check for errors
      const withErrors = checkConsistency(updatedPairs);

      // Save in location storage
      localStorage.setItem(action.payload.dict.id, JSON.stringify(withErrors));

      return mergeWith(state, { currentDictionary: withErrors }, (obj, src) => {
        if (!isNil(src)) {
          return src;
        }
        return obj;
      });
    },
    [Dictionary.TOGGLE_EDIT_DICTIONARY_PAIR]: (state, action) => {
      const currentDictionary = clone(state.currentDictionary) || [];
      const currentEditState = state.editState ? clone(state.editState) : [];
      const toggledPair = currentDictionary.find((pair) => pair.id === action.payload);
      if (toggledPair) {
        currentEditState.push({
          id: toggledPair.id,
          domain: toggledPair.domain,
          range: toggledPair.range,
        });
      }
      const updatedDictionary = currentDictionary.map((pair) =>
        pair.id === action.payload ? { ...pair, editMode: true } : pair
      );
      return merge(state, {
        currentDictionary: updatedDictionary,
        editState: currentEditState,
      });
    },
    [Dictionary.EDIT_DICTIONARY_PAIR]: (state, action) => {
      const currentEditState = clone(state.editState) || [];
      const updatedEditState = currentEditState.map((editPair) =>
        editPair.id === action.payload.id ? action.payload : editPair
      );
      return merge(state, {
        editState: updatedEditState,
      });
    },
    [Dictionary.CANCEL_EDIT_DICTIONARY_PAIR]: (state, action) => {
      const currentEditState = clone(state.editState) || [];
      const updatedEditState = currentEditState.filter((pair) => pair.id !== action.payload);
      const currentDictionary = clone(state.currentDictionary) || [];
      const updatedDictionary = currentDictionary.map((pair) =>
        pair.id === action.payload ? { ...pair, editMode: false } : pair
      );
      return mergeWith(
        state,
        {
          currentDictionary: updatedDictionary,
          editState: updatedEditState,
        },
        (obj, src) => {
          if (!isNil(src)) {
            return src;
          }
          return obj;
        }
      );
    },
    [Dictionary.SAVE_DICTIONARY_PAIR]: (state, action) => {
      const currentEditState = clone(state.editState) || [];
      const updatedEditState = currentEditState.filter((pair) => pair.id !== action.payload.id);
      const currentDictionary = clone(state.currentDictionary) || [];
      const updatedDictionary = currentDictionary.map((pair) =>
        pair.id === action.payload.id
          ? {
              ...pair,
              domain: action.payload.domain,
              range: action.payload.range,
              editMode: false,
            }
          : pair
      );

      // Check for errors
      const withErrors = checkConsistency(updatedDictionary);

      // Save in local storage
      localStorage.setItem(action.payload.dictId, JSON.stringify(withErrors));

      return mergeWith(
        state,
        {
          currentDictionary: withErrors,
          editState: updatedEditState,
        },
        (obj, src) => {
          if (!isNil(src)) {
            return src;
          }
          return obj;
        }
      );
    },
  }
);

export { initialDictionaryState, dictionaryReducer };
