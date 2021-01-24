import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Pokemon.module.scss';
import { connect } from 'react-redux';
import { getPokemon } from '../../../redux/pokemonsRedux';

const Component = ({ className, getOne }) => {

  useEffect(() => {
    console.log(getOne);
  }, [getOne]);


  console.log(getOne);

  return (
    <>
      {getOne ? <div className={clsx(className, styles.root)}>
        <h2>{getOne.name}</h2>
        <img src={getOne.sprites.front_default} alt="" />
        <h3>{getOne.stats.[0].stat.name} : {getOne.stats.[0].base_stat}</h3>
        <h3>{getOne.stats.[1].stat.name} : {getOne.stats.[1].base_stat}</h3>
        <h3>{getOne.stats.[2].stat.name} : {getOne.stats.[2].base_stat}</h3>
        <h3>{getOne.stats.[3].stat.name} : {getOne.stats.[3].base_stat}</h3>
      </div>
        : null}
    </>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  getOne: PropTypes.any,
};

const mapStateToProps = state => ({
  getOne: getPokemon(state),
});

const Container = connect(mapStateToProps, null)(Component);

export {
  Container as Pokemon,
  Component as PokemonComponent,
};