function buildsReducer(state = [], action) {
    switch (action.type) {
        case 'ADD':
            if (action.payload.length > 1)
                state.push(...action.payload);
            else
                state.unshift(action.payload);
            return state;
        case 'CLEAR_ALL':
            return [];
        default:
            return state;
    }
}

export default buildsReducer;