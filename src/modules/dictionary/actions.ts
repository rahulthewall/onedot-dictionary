import { action } from 'typesafe-actions';

import {
  Dictionary,
  IDictionary,
  IDictionaryPair,
  IDictionaryItem,
  IDictionaryPairSaveItem,
} from './types';

const addDictionaryAction = (dictionary: IDictionary) =>
  action(Dictionary.ADD_DICTIONARY, dictionary);

const removeDictionaryAction = (dictionary: IDictionary) =>
  action(Dictionary.REMOVE_DICTIONARY, dictionary);

const loadDictionaryAction = (id: string) => action(Dictionary.LOAD_DICTIONARY, id);

const addDictionaryPairAction = (dictionaryItem: IDictionaryItem) =>
  action(Dictionary.ADD_DICTIONARY_PAIR, dictionaryItem);

const toggleEditDictionaryPairAction = (pairId: string) =>
  action(Dictionary.TOGGLE_EDIT_DICTIONARY_PAIR, pairId);

const editDictionaryPairAction = (dictionaryPair: IDictionaryPair) =>
  action(Dictionary.EDIT_DICTIONARY_PAIR, dictionaryPair);

const cancelEditDictionaryPairAction = (pairId: string) =>
  action(Dictionary.CANCEL_EDIT_DICTIONARY_PAIR, pairId);

const removeDictionaryPairAction = (dictionaryItem: IDictionaryItem) =>
  action(Dictionary.REMOVE_DICTIONARY_PAIR, dictionaryItem);

const saveDictionaryPairAction = (dictionaryPair: IDictionaryPairSaveItem) =>
  action(Dictionary.SAVE_DICTIONARY_PAIR, dictionaryPair);

export {
  addDictionaryAction,
  removeDictionaryAction,
  loadDictionaryAction,
  addDictionaryPairAction,
  toggleEditDictionaryPairAction,
  editDictionaryPairAction,
  cancelEditDictionaryPairAction,
  removeDictionaryPairAction,
  saveDictionaryPairAction,
};
