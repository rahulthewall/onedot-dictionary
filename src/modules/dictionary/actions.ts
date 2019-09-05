import { action } from "typesafe-actions";

import { Dictionary, IDictionary, IDictionaryPair } from "./types";

const addDictionaryAction = (dictionary: IDictionary) =>
  action(Dictionary.ADD_DICTIONARY, dictionary);

const removeDictionaryAction = (dictionary: IDictionary) =>
  action(Dictionary.REMOVE_DICTIONARY, dictionary);

const addDictionaryPairAction = (dictionaryPair: IDictionaryPair) =>
  action(Dictionary.ADD_DICTIONARY_PAIR, dictionaryPair);

const editDictionaryPairAction = (dictionaryPair: IDictionaryPair) =>
  action(Dictionary.EDIT_DICTIONARY_PAIR, dictionaryPair);

const removeDictionaryPairAction = (dictionaryPair: IDictionaryPair) =>
  action(Dictionary.REMOVE_DICTIONARY_PAIR, dictionaryPair);

export {
  addDictionaryAction,
  removeDictionaryAction,
  addDictionaryPairAction,
  editDictionaryPairAction,
  removeDictionaryPairAction
};
