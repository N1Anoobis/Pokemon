import Axios from 'axios';

/* selectors */
export const getPokemon = ({ pokemons }) => pokemons.currentOne;
export const getPokemons = ({ pokemons }) => pokemons.data;

/* action name creator */
const reducerName = 'pokemons';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_POKEMON = createActionName('FETCH_POKEMON');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchSinglePokemon = payload => ({ payload, type: FETCH_POKEMON });

/* thunk creators */
export const loadPokemons = () => {
  return (dispatch, getState) => {

    dispatch(fetchStarted());
    Axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=25`)
      .then(res => {
        dispatch(fetchSuccess(res.data.results));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const getSinglePokemon = (name) => {
  return async (dispatch, state) => {

    dispatch(fetchStarted());
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        dispatch(fetchSinglePokemon(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_POKEMON: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        currentOne: action.payload,
      };
    }
    default:
      return statePart;
  }
};