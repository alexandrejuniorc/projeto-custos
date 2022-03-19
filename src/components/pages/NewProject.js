import { useNavigate } from 'react-router-dom';
import React from 'react';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';
const NewProject = () => {
  // HOOK
  // permite fazer redirecionamentos de página
  const history = useNavigate();

  function createPost(projeto) {
    // inicializa custos e serviços
    projeto.custo = 0;
    projeto.servicos = [];

    //requisição da api criada '/projects' que no momento inicial é uma array vazia
    fetch('http://localhost:5000/projects', {
      // método de envio
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // indica que quero receber um json
      body: JSON.stringify(projeto), // mandando os dados pro servidor como string
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        console.log(data);

        //redirecionamento
        // quando tiver sucesso na adição do projeto ele irá redirecionar para essa página
        history('/projects', { message: 'Projeto criado com sucesso!' });
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
};

export default NewProject;
