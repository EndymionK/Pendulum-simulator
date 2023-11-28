import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import '../../styles/AnimacionPendulo.css';

const AnimacionPendulo = ({ angle, rodHeight, mass }) => {
  const rodRef = useRef(null);
  const [currentKineticEnergy, setCurrentKineticEnergy] = useState(0);
  const [currentPotentialEnergy, setCurrentPotentialEnergy] = useState(0);

  useEffect(() => {
    let updateCounter = 0;
    const rodAnimation = anime({
      targets: rodRef.current,
      rotate: [angle, -angle],
      duration: 6000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
      update: function (anim) {
        updateCounter++;
        if (updateCounter % 7 === 0) {  // Actualizar cada 5 fotogramas
          const numericAngle = parseFloat(anim.animations[0].currentValue.match(/[+-]?([0-9]*[.])?[0-9]+/)[0]);
          const radians = (numericAngle * Math.PI) / 180;
          const kineticEnergy = 0.5 * mass * Math.pow(rodHeight, 2) * Math.pow(numericAngle, 2);
          const potentialEnergy = mass * 9.81 * rodHeight * (1 - Math.cos(radians));
    
          setCurrentKineticEnergy(kineticEnergy);
          setCurrentPotentialEnergy(potentialEnergy);
        }
      }
    });

    return () => {
      rodAnimation.pause();
    };
  }, [angle, mass, rodHeight]);

  return (
    <div className="pendulum-container">
      <div className="energy-labels">
        <p>Energía Cinética en Tiempo Real: {currentKineticEnergy.toFixed(2)} joules</p>
        <p>Energía Potencial en Tiempo Real: {currentPotentialEnergy.toFixed(2)} joules</p>
      </div>

      <div ref={rodRef} className="pendulum-rod" style={{ height: rodHeight * 50 + 'px' }}>
        <div className="pivot"></div>
        <div
          id="ball"
          className="ball"
          style={{ width: 20 * mass + 'px', height: 20 * mass + 'px' }}
        ></div>
      </div>
    </div>
  );
};

export default AnimacionPendulo;
