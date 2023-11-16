// 'use client'
// AnimacionPendulo.js
import React, { useEffect } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import '../../styles/AnimacionPendulo.css';

const AnimacionPendulo = ({ angle, rodHeight, mass }) => {
  useEffect(() => {
    const rodAnimation = anime({
      targets: '#rod',
      rotate: [angle, -angle],
      duration: 3000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    });

    return () => {
      rodAnimation.pause();
    };
  }, [angle, rodHeight]);

  return (
    <div id="rod" className="pendulum-rod" style={{ height: rodHeight * 50 + 'px' }}>
      <div id="pivot" className="pivot"></div>
      <div id="ball" className="ball" style={{width: 20 * mass +'px' ,height: 20 * mass +'px'}}></div>
    </div>
  );
};

AnimacionPendulo.propTypes = {
  angle: PropTypes.number.isRequired,
  rodHeight: PropTypes.number.isRequired,
};

export default AnimacionPendulo;