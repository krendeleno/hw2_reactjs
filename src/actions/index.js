export const set = (settingsData) => {
    return {
        type: 'SET',
        payload: settingsData
    }
}

export const add = (builds) => {
    return {
        type: 'ADD',
        payload: builds
    }
}

export const clearAll = () => {
    return {
        type: 'CLEAR_ALL',
    }
}
