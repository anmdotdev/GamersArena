export default [
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
