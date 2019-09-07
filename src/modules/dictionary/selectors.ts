import { RootState } from '../redux/types';

const dictionaries = (state: RootState) => state.dictionaryReducer.dictionaries;

const dictionary = (state: RootState) =>
  state.dictionaryReducer.currentDictionary &&
  state.dictionaryReducer.currentDictionary.map((pair, index) => ({
    key: index,
    ...pair,
  }));

export { dictionaries, dictionary };
