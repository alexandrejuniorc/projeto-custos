import React from 'react';
import styles from './Container.module.css';

const Container = ({ children, customClass }) => {
  /* dentro do children irá possuir os elementos filhos */
  return (
    /* customClass puxa o css do container e puxa a classe que vem das propriedades dentro do item */
    <div className={`${styles.container} ${styles[customClass]}`}>
      {children}
    </div>
  );
};

export default Container;
