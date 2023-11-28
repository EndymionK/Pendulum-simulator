'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import AnimacionPendulo from './AnimacionPendulo';
import '../../styles/AnimacionPendulo.css';
import AlertModal from './AlertModal';

// Aceleración debida a la gravedad (constante)
const g = 9.81;

// Componente principal de la aplicación
const Home = () => {
  // Estados para manejar diferentes variables y resultados de la simulación
  const [length, setLength] = useState(2);
  const [mass, setMass] = useState(1);
  const [angle, setAngle] = useState(45);
  const [results, setResults] = useState(null);
  const [amplitud, setAmplitud] = useState(45);
  const [aceleracionGravedad, setAceleracionGravedad] = useState(0.1);
  const [showAnimation, setShowAnimation] = useState(false);
  const [rodHeight, setRodHeight] = useState(10);
  const [ballSize, setBallSize] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [kineticEnergyRealTime, setKineticEnergyRealTime] = useState(0);
  const [potentialEnergyRealTime, setPotentialEnergyRealTime] = useState(0);

  // Función para simular el movimiento del péndulo
  const simulatePendulum = () => {
    // Validación: Mostrar alerta si el ángulo es demasiado grande
    if (angle > 12) {
      setShowAlert(true);
    }
    
    // Validación: Evitar divisiones por cero y ángulos nulos
    if (length === 0 || mass === 0 || angle === 0) {
      alert('Los valores de longitud, masa y ángulo no pueden ser 0. Ingresa valores válidos.');
      return;
    }
  
    // Cálculos físicos para obtener resultados de la simulación
    const radians = (angle * Math.PI) / 180;
    const period = 2 * Math.PI * Math.sqrt(length / g);
    const amplitude = angle;
    const potentialEnergy = mass * g * length * (1 - Math.cos(radians));
    const kineticEnergy = 0.5 * mass * Math.pow(length, 2) * Math.pow(angle, 2);
  
    // Actualización de estados con resultados de la simulación
    setResults({
      period: period.toFixed(2),
      amplitude: parseFloat(amplitude).toFixed(2),
      potentialEnergy: potentialEnergy.toFixed(2),
      kineticEnergy: kineticEnergy.toFixed(2),
    });
  
    // Actualización de otros estados relevantes
    setAmplitud(angle);
    setAceleracionGravedad(g);
    setRodHeight(length);
    setBallSize(mass * 10);
    setShowAnimation(true);
  
    // Actualizar estados para la energía cinética y potencial en tiempo real
    setKineticEnergyRealTime(kineticEnergy);
    setPotentialEnergyRealTime(potentialEnergy);
  };

  // Efecto secundario para ocultar la animación cuando cambian ciertos estados
  useEffect(() => {
    setShowAnimation(false);
  }, [length, mass, angle]);

  // Estructura de la interfaz de usuario
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simulador de Péndulo</h1>

      <div className={styles.splitContainer}>
        <div className={styles.half}>
          {/* Entradas para el usuario: Longitud, Masa, Ángulo */}
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Longitud del Péndulo (metros):</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Masa del Péndulo (kilogramos):</label>
            <input type="number" value={mass} onChange={(e) => setMass(e.target.value)} />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Ángulo Inicial del Péndulo (grados):</label>
            <input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} />
          </div>

          {/* Botón para iniciar la simulación */}
          <button className={styles.simulateButton} onClick={simulatePendulum}>
            Simular Péndulo
          </button>

          {/* Mostrar resultados de la simulación */}
          {results && (
            <div className={styles.resultsContainer}>
              <h2>Resultados de la Simulación</h2>
              <p>Periodo: {results.period} segundos</p>
              <p>Amplitud: {results.amplitude} grados</p>
              <p>Energía Potencial máxima: {results.potentialEnergy} joules</p>
              <p>Energía Cinética máxima: {results.kineticEnergy} joules</p>
            </div>
          )}
        </div>

        {/* Mostrar la animación si está habilitada */}
        <div className={styles.half}>
          <div className={styles.animationContainer}>
            {showAnimation && (
              <AnimacionPendulo
                amplitud={amplitud}
                mass={mass}
                angle={angle}
                rodHeight={rodHeight}
                aceleracionGravedad={aceleracionGravedad}
                ballSize={ballSize}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mostrar alerta si es necesario */}
      {showAlert && (
        <AlertModal
          closeModal={() => setShowAlert(false)}
          message="El ángulo es muy grande y la ecuación podría no ser precisa. Por favor, ingresa un ángulo menor."
        />
      )}
    </div>
  );
};

export default Home;
