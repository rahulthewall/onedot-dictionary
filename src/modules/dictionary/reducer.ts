import { createReducer } from 'typesafe-actions';
import { clone, merge, mergeWith, isNil } from 'lodash';

import { DictionaryState, DictionaryActions, Dictionary, IDictionary } from './types';

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
  }
);

export { initialDictionaryState, dictionaryReducer };
