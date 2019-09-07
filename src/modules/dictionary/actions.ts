import { action } from 'typesafe-actions';

import { Dictionary, IDictionary, IDictionaryPair, IDictionaryItem } from './types';

const addDictionaryAction = (dictionary: IDictionary) =>
  action(Dictionary.ADD_DICTIONARY, dictionary);

const removeDictionaryAction = (dictionary: IDictionary) =>
  action(Dictionary.REMOVE_DICTIONARY, dictionary);

const loadDictionaryAction = (id: string) => action(Dictionary.LOAD_DICTIONARY, id);

const addDictionaryPairAction = (dictionaryPair: IDictionaryItem) =>
  action(Dictionary.ADD_DICTIONARY_PAIR, dictionaryPair);

const editDictionaryPairAction = (dictionaryPair: IDictionaryPair) =>
  action(Dictionary.EDIT_DICTIONARY_PAIR, dictionaryPair);

const removeDictionaryPairAction = (dictionaryPair: IDictionaryItem) =>
  action(Dictionary.REMOVE_DICTIONARY_PAIR, dictionaryPair);

export {
  addDictionaryAction,
  removeDictionaryAction,
  loadDictionaryAction,
  addDictionaryPairAction,
  editDictionaryPairAction,
  removeDictionaryPairAction,
};
