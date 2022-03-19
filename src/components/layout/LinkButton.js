import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';

/* foi desestruturado o 'to' que é para onde vai ao clicar no botão
  e o 'text' que será o texto do botão
*/
const LinkButton = ({ to, text }) => {
  return (
    <Link className={styles.btn} to={to}>
      {text}
    </Link>
  );
};

export default LinkButton;
