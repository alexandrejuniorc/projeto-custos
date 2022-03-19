import React from 'react';
import styles from './Message.module.css';
import { useState, useEffect } from 'react';

const Message = ({ type, mensagem }) => {
  //hook pra alterar a visibilidade
  //eu quero que a mensagem suma dependendo da condição
  const [visible, setVisible] = useState(false); // ele começa falso e não começa exibindo na tela

  useEffect(() => {
    // se não tiver mensagem não irá exibir nada
    if (!mensagem) {
      setVisible(false);
      return;
    }
    // se tiver mensagem ela será apagada em 3 segunds
    else {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // 3 segundos
      return () => clearTimeout(timer); // finaliza o timer
    }
  }, [mensagem]);

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{mensagem}</div>
      )}
    </>
  );
};

export default Message;
