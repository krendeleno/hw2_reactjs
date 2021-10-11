import React from 'react';

export const Context = React.createContext({
    github: '',
    build: '',
    branch: '',
    sync: '',
    addedBuilds: ''
});