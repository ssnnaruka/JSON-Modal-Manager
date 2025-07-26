import React, { createContext, useContext, useReducer, useCallback } from "react";

const ADD_COMPONENT = "ADD_COMPONENT";
const RESET_COMPONENTS = "RESET_COMPONENTS";
const LOAD_COMPONENTS = "LOAD_COMPONENTS";
const UPDATE_JSON = "UPDATE_JSON";

const initialState = {
  components: [{ actionJson: null, demoJson: null }]
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_COMPONENT:
      return {
        ...state,
        components: [...state.components, { actionJson: null, demoJson: null }]
      };
    case RESET_COMPONENTS:
      return initialState;
    case LOAD_COMPONENTS:
      return { components: action.payload };
    case UPDATE_JSON: {
      const { index, type, data } = action.payload;
      const updated = [...state.components];
      updated[index][type] = data;
      return { ...state, components: updated };
    }
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addComponent = useCallback(() => dispatch({ type: ADD_COMPONENT }), []);
  const resetComponents = useCallback(() => dispatch({ type: RESET_COMPONENTS }), []);
  const loadComponents = useCallback((payload) => dispatch({ type: LOAD_COMPONENTS, payload }), []);
  const updateJson = useCallback((index, type, data) => {
    dispatch({ type: UPDATE_JSON, payload: { index, type, data } });
  }, []);

  return (
    <AppContext.Provider value={{ state, addComponent, resetComponents, loadComponents, updateJson }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);