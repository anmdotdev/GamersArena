import { createReducer } from '../shared/reduxorator';

import initialState from './state';
import apiActions from './api';
import syncActions from './sync';
const prefix = 'GAMES';

export const { reducer, actions } = createReducer(initialState, apiActions, syncActions, prefix);
