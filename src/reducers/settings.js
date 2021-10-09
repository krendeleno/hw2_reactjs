function settingsReducer(state = {
    github: '',
    build: '',
    branch: '',
    sync: '',
}, action) {
    switch (action.type) {
        case 'SET':
            return {
                github: action.payload.github,
                build: action.payload.build,
                branch: action.payload.branch,
                sync: action.payload.sync,
            }
        case 'CLEAR':
            return {
                github: '',
                build: '',
                branch: '',
                sync: '',
            }
        default:
            return state
    }
}

export default settingsReducer;