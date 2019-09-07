import { RootState } from '../redux/types';

const dictionaries = (state: RootState) => state.dictionaryReducer.dictionaries;

const dictionary = (state: RootState) =>
  state.dictionaryReducer.currentDictionary &&
  state.dictionaryReducer.currentDictionary.map((pair, index) => ({
    key: index,
    ...pair,
  }));

const editState = (state: RootState) => state.dictionaryReducer.editState || [];

export { dictionaries, dictionary, editState };
