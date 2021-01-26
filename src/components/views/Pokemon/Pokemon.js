import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Pokemon.module.scss';
import { connect } from 'react-redux';
import { getPokemon } from '../../../redux/pokemonsRedux';

const Component = ({ className, getOne }) => {

  useEffect(() => {
  }, [getOne]);

  return (
    <>
      {getOne ? <div className={clsx(className, styles.root)}>
        <h2>{getOne.name}</h2>
        <img src={getOne.sprites.front_default} alt="" />
        {getOne.stats.map( (stats,index) => 
        { return <h3 key={index}>{stats.stat.name} : {stats.base_stat}</h3>;})}
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