function buildsReducer(state = [], action) {
    switch (action.type) {
        case 'ADD':
            let res = [...state];
            if (action.payload.length > 1)
                res.push(...action.payload);
            else {
                res.unshift(action.payload);
            }
            return res;
        case 'CLEAR_ALL':
            return [];
        default:
            return state;
    }
}

export default buildsReducer;