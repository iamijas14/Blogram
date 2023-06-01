import React, { createContext, useContext, useReducer } from 'react'
import reducer, { initialState } from './reducer';

const StateContext = createContext();

export const DataLayerProvider = ({ children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)} >
            {children}
        </StateContext.Provider>
    )
};

export const useDatalayer = () => useContext(StateContext);