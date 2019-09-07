import { ActionType } from 'typesafe-actions';
import * as dictActions from './actions';

export type DictionaryActions = ActionType<typeof dictActions>;

export interface IDictionary {
  name: string;
  id: string;
}

export interface IDictionaryPair {
  id: string;
  domain: string;
  range: string;
}

export interface IDictionaryItem {
  dict: IDictionary;
  pair: IDictionaryPair;
}

export interface IDictionaryListItem extends IDictionaryPair {
  editMode: boolean;
  errors: ConsistencyIssues[];
}

export interface IDictionaryPairSaveItem extends IDictionaryPair {
  dictId: string;
}

export interface DictionaryState {
  dictionaries: IDictionary[];
  currentDictionary?: IDictionaryListItem[];
  editState?: IDictionaryPair[];
}

/* Error States */
export enum ConsistencyIssues {
  NONE = 'dictionary/NONE',
  DUPLICATES = 'dictionary/DUPLICATES',
  FORKS = 'dictionary/FORKS',
  CYCLES = 'dictionary/CYCLES',
  CHAINS = 'dictionary/CHAINS',
}

/* Action Constants */
export enum Dictionary {
  ADD_DICTIONARY = 'dictionary/ADD_DICTIONARY',
  REMOVE_DICTIONARY = 'dictionary/REMOVE_DICTIONARY',
  LOAD_DICTIONARY = 'dictionary/LOAD_DICTIONARY',
  ADD_DICTIONARY_PAIR = 'dictionary/ADD_DICTIONARY_PAIR',
  TOGGLE_EDIT_DICTIONARY_PAIR = 'dictionary/TOGGLE_EDIT_DICTIONARY_PAIR',
  EDIT_DICTIONARY_PAIR = 'dictionary/EDIT_DICTIONARY_PAIR',
  CANCEL_EDIT_DICTIONARY_PAIR = 'dictionary/CANCEL_EDIT_DICTIONARY_PAIR',
  REMOVE_DICTIONARY_PAIR = 'dictionary/REMOVE_DICTIONARY_PAIR',
  SAVE_DICTIONARY_PAIR = 'dictionary/SAVE_DICTIONARY_PAIR',
}
