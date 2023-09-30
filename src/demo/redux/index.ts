// @ts-nocheck

// 实现
const createStore = (reducer, initState, middlewareFn) => {
  if (middlewareFn) {
    return middlewareFn(createStore)(reducer, initState);
  }
  let state = initState,
    listeners = [];
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener(state));
  };
  const subscribe = listener => {
    listeners.push(listener);
    return () => (listeners = listeners.filter(l => l !== listener));
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'x':
      return state + payload;
  }
};

//
function applyMiddleware(...middlewares: Middleware[]): StoreEnhancer<any> {
  return createStore => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    let dispatch: Dispatch = () => {
      throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
    };

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

// 使用方式
const store = createStore(reducer, initial_state, applyMiddleware(logger));
