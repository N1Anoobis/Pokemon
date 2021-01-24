import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Homepage.module.scss';
import { connect } from 'react-redux';
import { loadPokemons, getPokemons, getSinglePokemon } from '../../../redux/pokemonsRedux';
import { useHistory } from 'react-router-dom';

const Component = ({ className, getPokemons, readPokemons, getSpecificPokemon }) => {

  const history = useHistory();

  useEffect(() => {
    getPokemons();

  }, [getPokemons]);
  console.log(readPokemons);

  const getSinglePokemon = (name) => {
    getSpecificPokemon(name);
    routeChange(name);
  };

  const routeChange = (id) => {
    let path = `/pokemons/${id}`;
    history.push(path);
  };

  return (
    <div className={clsx(className, styles.root)}>
      {readPokemons ? readPokemons.map(pokemon => <div className={styles.pokemon} key={pokemon.name} onClick={() => getSinglePokemon(pokemon.name)}> {pokemon.name} </div>) : null
      }
    </div>
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