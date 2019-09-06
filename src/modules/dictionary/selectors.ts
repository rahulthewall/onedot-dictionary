import { RootState } from '../redux/types';

const dictionaries = (state: RootState) => state.dictionaryReducer.dictionaries;

export { dictionaries };
