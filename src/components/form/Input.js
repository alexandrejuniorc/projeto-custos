import React from 'react';
import styles from './Input.module.css';

const Input = ({ type, text, name, placeholder, handleOnChange, value }) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
};

export default Input;
