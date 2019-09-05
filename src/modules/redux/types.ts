import { StateType, ActionType } from 'typesafe-actions';

export type RootState = StateType<typeof import('./rootReducer').rootReducer>;

export type RootAction = ActionType<typeof import('./rootAction').rootAction>;
