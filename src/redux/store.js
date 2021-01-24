import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from './initialState';
import { reducer as pokemonsReducer } from './pokemonsRedux';

// define reducers
const reducers = {
  pokemons: pokemonsReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  //   initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);