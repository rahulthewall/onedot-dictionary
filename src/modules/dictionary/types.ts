import { ActionType, Action } from 'typesafe-actions';
import * as dictActions from './actions';

export type DictionaryActions = ActionType<typeof dictActions>;

export interface IDictionary {
  name: string;
  id: string;
}

export interface IDictionaryList {
  [key: string]: string;
}

export interface IDictionaryPair {
  domain: string;
  range: string;
}

export interface DictionaryState {
  dictionaries: IDictionary[];
  currentDictionary?: IDictionaryList;
}

/* Action Constants */
export enum Dictionary {
  ADD_DICTIONARY = 'dictionary/ADD_DICTIONARY',
  REMOVE_DICTIONARY = 'dictionary/REMOVE_DICTIONARY',
  ADD_DICTIONARY_PAIR = 'dictionary/ADD_DICTIONARY_PAIR',
  EDIT_DICTIONARY_PAIR = 'dictionary/EDIT_DICTIONARY_PAIR',
  REMOVE_DICTIONARY_PAIR = 'dictionary/REMOVE_DICTIONARY_PAIR',
}
