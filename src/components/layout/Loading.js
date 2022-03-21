import React from 'react';
import styles from './Loading.module.css';
import loading from '../../img/loading.svg';
const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.loader} src={loading} alt="Loading" />
    </div>
  );
};

export default Loading;
