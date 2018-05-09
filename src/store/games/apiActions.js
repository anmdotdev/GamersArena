const apiActions = [
    {
        call: 'getGames',
        params: () => ({}),
        apiType: 'get',
        path: '/.json',
        action: {
            initiate: response => ({ games: response.data }),
            success: response => ({ games: response.data }),
            failure: response => ({ games: response.data }),
            response: response => ({ games: response.data })
        },
        reducer: {
            initiate: response => ({ games: response.data }),
            success: response => ({ games: response.data }),
            failure: response => ({ games: response.data }),
            response: response => ({ games: response.data })
        }
    }
];

export default apiActions;
