// 自定义 Hook
import { useEffect, useState } from 'react';

export function createStore(initialState) {
    let state = initialState;
    let listeners: any[] = [];
    const getState = () => state;
    const setState = newState => {
        state = typeof newState === 'function' ? newState(state) : newState;
        listeners.forEach(listener => listener(state));
    };
    const subscribe = fn => {
        listeners.push(fn);
        return () => {
            listeners = listeners.filter(l => l !== fn);
        };
    };
    return {
        getState,
        setState,
        subscribe,
    };
}

export function useStore(store, selector = state => state) {
    const [selectedState, setSelectedState] = useState(selector(store.getState()));

    useEffect(() => {
        const unsubscribe = store.subscribe(newState => {
            const newSelectedState = selector(newState);
            setSelectedState(newSelectedState);
        });

        return unsubscribe;
    }, [store, selector]);

    return selectedState;
}
