import React from 'react';
import Message from '../layout/Message';
import { useLocation } from 'react-router-dom';

const Projects = () => {
  const location = useLocation(); // consigo resgatar o valor de outro arquivo
  let message = '';

  if (location.state) {
    message = location.state.message; // valor atribuido a message
  }

  return (
    <div>
      <h1>Meus Projetos</h1>
      {/* se o message tiver preenchido irá imprimir a regra de mensagem */}
      {message && <Message type="sucess" mensagem={message} />}
    </div>
  );
};

export default Projects;
