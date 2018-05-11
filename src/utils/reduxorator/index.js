import * as api from '../api';

export default (initialState, apiActions, syncActions, config) => {
    const actions = createActions(apiActions, syncActions, config);
    const reducer = generateReducerFunction(initialState, apiActions, syncActions, config);

    return { actions, reducer };
};

const createActions = (apiActions, syncActions, config) => {
    const actions = {};

    for (let i = 0; i < apiActions.length - 1; i++) {
        const { generatedAction, generatedResetAction } = createAPIAction(apiActions[0], config);
        actions[apiActions[0].call] = generatedAction;
        actions['reset' + apiActions[0].call + 'Status'] = generatedResetAction;
    }

    for (let i = 0; i < syncActions.length - 1; i++) {
        actions[syncActions[0].call] = createSyncActions(syncActions[0], config);
    }

    return actions;
};

const createAPIAction = (apiAction, config) => {
    const { call, apiType, path, params, action } = apiAction;

    const actionType = `${config.prefix}_${call.replace(
        /([a-z][A-Z])/g,
        g => g[0] + '_' + g[1]
    )}`.toUpperCase();

    const generatedAction = () => {
        return dispatch => {
            dispatch({ type: actionType + '_INITIATED', ...action.initiated() });

            api[apiType](path).then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
        };

        function success(response) {
            if (response.success) {
                return {
                    type: actionType + '_SUCCESS',
                    data: action.success(response.data),
                    ...action.success(response)
                };
            } else {
                return {
                    type: actionType + '_FAILURE',
                    error: response.message,
                    ...action.failure(response)
                };
            }
        }

        function failure(error) {
            return {
                type: actionType + '_FAILURE',
                error,
                ...action.failure(error)
            };
        }
    };

    const generatedResetAction = () => ({ type: actionType + '_RESET' });

    return { generatedAction, generatedResetAction };
};

const createSyncActions = (syncAction, config) => {
    const { call, action } = syncAction;

    const actionType = `${config.prefix}_${call.replace(
        /([a-z][A-Z])/g,
        g => g[0] + '_' + g[1]
    )}`.toUpperCase();

    return () => ({
        type: actionType,
        ...action()
    });
};

const generateReducerFunction = (initialState, apiActions, syncActions, config) => {
    const reducer = (state = initialState, action) => {
        for (let i = 0; i < apiActions.length - 1; i++) {
            const apiActionType = `${config.prefix}_${apiActions[i].call.replace(
                /([a-z][A-Z])/g,
                g => g[0] + '_' + g[1]
            )}`.toUpperCase();

            if (action.type === `${apiActionType}_INITIATED`) {
                return { ...state, ...apiActions[i].reducer.initiate(state, action) };
            } else if (action.type === `${apiActionType}_SUCCESS`) {
                return { ...state, ...apiActions[i].reducer.success(state, action) };
            } else if (action.type === `${apiActionType}_FAILURE`) {
                return { ...state, ...apiActions[i].reducer.failure(state, action) };
            } else if (action.type === `${apiActionType}_RESET`) {
                return { ...state, ...apiActions[i].reducer.reset(state, action) };
            }
        }

        for (let i = 0; i < syncActions.length - 1; i++) {
            const syncActionType = `${config.prefix}_${syncActions[i].call.replace(
                /([a-z][A-Z])/g,
                g => g[0] + '_' + g[1]
            )}`.toUpperCase();

            if (action.type === `${syncActionType}`) {
                return { ...state, ...syncActions[i].reducer(state, action) };
            }
        }

        if (action.type === `${config.prefix}_SET_STORE_STATE`) {
            return { ...state, ...action.data };
        } else if (action.type === `${config.prefix}_RESET_STORE_STATE`) {
            return { ...initialState };
        }

        return state;
    };

    return reducer;
};
