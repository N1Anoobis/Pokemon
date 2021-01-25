import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Homepage.module.scss';
import { connect } from 'react-redux';
import { loadPokemons, getPokemons, getSinglePokemon } from '../../../redux/pokemonsRedux';
import { useHistory } from 'react-router-dom';

const Component = ({ className, getPokemons, readPokemons, getSpecificPokemon }) => {

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  let finalPokemons = [];

  if (readPokemons) {
    finalPokemons = [...readPokemons];
    console.log(finalPokemons);
  }

  const history = useHistory();
  const [pokemons, setPokemons] = useState(readPokemons);

  const getSinglePokemon = (name) => {
    getSpecificPokemon(name);
    routeChange(name);
  };

  const routeChange = (id) => {
    let path = `/pokemons/${id}`;
    history.push(path);
  };

  const handleChange = (e) => {
    const searchWord = (e.target.value.toLowerCase());
    
    finalPokemons = readPokemons.filter(pokemon => pokemon.name.includes(searchWord));
    console.log(finalPokemons);
    setPokemons(finalPokemons);
  };

  return (
    <>
      <label htmlFor="">
        <input type="text"
          onChange={handleChange}
          placeholder="Enter pokemon" />
      </label>
      <div className={clsx(className, styles.root)}>
        {pokemons ?
          pokemons.map(pokemon => <div className={styles.pokemon} key={pokemon.name} 
            onClick={() => getSinglePokemon(pokemon.name)}> {pokemon.name} </div>) 
          : null
        }
      </div>
    </>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  getPokemons: PropTypes.func,
  readPokemons: PropTypes.any,
  getSpecificPokemon: PropTypes.func,
};

const mapStateToProps = state => ({
  readPokemons: getPokemons(state),
});

const mapDispatchToProps = dispatch => ({
  getPokemons: () => dispatch(loadPokemons()),
  getSpecificPokemon: (name) => dispatch(getSinglePokemon(name)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};