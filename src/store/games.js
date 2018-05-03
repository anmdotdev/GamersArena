import { createReducer } from '../shared/reduxorator';

const initialState = {
    games: null,
    searchValue: '',
    searchResults: null,
    sortType: 'id'
};

const apiActions = [
    {
        call: 'getActiveShipments',
        type: 'get',
        path: '/v1/games',
        data: { is_live: true, page_limit: '5' },
        action: {
            initiate: () => 'initiate',
            success: () => 'success',
            failure: () => 'failure',
            reset: () => 'reset'
        },
        reducer: {
            initiate: (s, a) => ({ ...s }),
            success: (s, a) => ({ ...s }),
            failure: (s, a) => ({ ...s }),
            reset: (s, a) => ({ ...s })
        }
    },
    {
        call: 'getShipmentSummary',
        type: 'get',
        path: '/v1/games',
        data: { is_live: true, page_limit: '5' },
        action: {
            initiate: () => 'initiate',
            success: () => 'success',
            failure: () => 'failure',
            reset: () => 'reset'
        },
        reducer: {
            initiate: (s, a) => ({ ...s }),
            success: (s, a) => ({ ...s }),
            failure: (s, a) => ({ ...s }),
            reset: (s, a) => ({ ...s })
        }
    },
    {
        call: 'getPastShipments',
        type: 'get',
        path: '/v1/games',
        data: { is_live: true, page_limit: '5' },
        action: {
            initiate: () => 'initiate',
            success: () => 'success',
            failure: () => 'failure',
            reset: () => 'reset'
        },
        reducer: {
            initiate: (s, a) => ({ ...s }),
            success: (s, a) => ({ ...s }),
            failure: (s, a) => ({ ...s }),
            reset: (s, a) => ({ ...s })
        }
    }
];

const syncActions = [
    {
        type: 'SET_GAMES',
        data: ['data'],
        action: {
            handler: () => 'handler'
        },
        reducer: {
            handler: (s, a) => ({ ...a })
        }
    }
];

const prefix = 'GAMES';
export const { reducer, actions } = createReducer(initialState, apiActions, syncActions, prefix);
