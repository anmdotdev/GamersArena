import * as api from '../helpers/api';

export default (initialState, apiActions, syncActions, config) => {
    const createdAPIActions = apiActions.map(apiAction => createAPIAction(apiAction, config));
    const createdSyncActions = syncActions.map(syncAction => createSyncActions(syncAction, config));

    const actions = { ...createdAPIActions, ...createdSyncActions };
    const reducer = generateReducerFunction(initialState, config);

    return { actions, reducer };
};

const createAPIAction = (apiAction, config) => {
    const { call, apiType, path, params, data, action } = apiAction;

    let actionType = (
        config.prefix + call.replace(/([a-z][A-Z])/g, g => g[0] + '_' + g[1])
    ).toUpperCase();

    return dispatch => {
        dispatch({ type: actionType + '_INITIATED', ...action.initiated() });

        api[apiType](path, params).then(
            response => dispatch(success(response)),
            error => dispatch(failure(error))
        );
    };

    function success(response) {
        if (response.success) {
            return {
                type: actionType + '_SUCCESS',
                data: action.success(response.data),
                ...action.success()
            };
        } else {
            return {
                type: actionType + '_FAILURE',
                error: response.message,
                ...action.failure()
            };
        }
    }

    function failure(error) {
        return {
            type: actionType + '_FAILURE',
            error,
            ...action.failure()
        };
    }
};

const createSyncActions = (syncAction, config) => {
    const { call, action } = syncAction;

    const actionType = (
        config.prefix + call.replace(/([a-z][A-Z])/g, g => g[0] + '_' + g[1])
    ).toUpperCase();

    return () => ({
        type: actionType,
        ...action()
    });
};

const generateReducerFunction = (initialState, config) => {
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case config.prefix + '_SET_STORE_STATE':
                return { ...state, ...action.data };

            case config.prefix + '_RESET_STORE_STATE':
                return { ...initialState };

            default:
                return state;
        }
    };

    return reducer;
};
