export default [
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
