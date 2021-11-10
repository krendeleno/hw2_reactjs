function settingsReducer(state = settingsDefault, action) {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return settingsDefault;
        default:
            return state
    }
}

const settingsDefault = {
    github: '',
    build: '',
    branch: '',
    sync: '',
}

export default settingsReducer;