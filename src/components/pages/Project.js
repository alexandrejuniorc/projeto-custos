import React from 'react';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';

const Project = () => {
  const { id } = useParams(); // utilizado para pegar o id que vem da url

  const [project, setProject] = useState([]); // iniciam com um array vazio

  const [showProjectForm, setShowProjectForm] = useState(false); // não exibe inicialmente o formulário do projeto
  const [showServiceForm, setShowServiceForm] = useState(false); // não exibe inicialmente o formulário do projeto

  const [message, setMessage] = useState(); // mensagem que irá ser escrita
  const [type, setType] = useState(); // tipo da mensagem

  useEffect(() => {
    //temporizador para que o loading funcione corretamente
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          setProject(data); // tenho meu projeto sendo resgatado do banco pelo parâmetro da url
        })
        .catch((erro) => console.log(erro));
    }, 500);
  }, [id]); // significa que estou monitorando o id

  // função que é utilizada para editar o projeto
  function editPost(project) {
    setMessage('');
    // console.log(project);
    // validação de orçamento
    if (project.orcamento < project.custo) {
      // mensagem
      setMessage('O orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }

    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'PATCH', // método patch só atualiza oq eu mandar pro formulário
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project), // está mandando os dados como texto
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setProject(data); //edita os dados que vieram em json
        setShowProjectForm(!showProjectForm); // fecha o formulário

        //mensagem
        setMessage('Projeto atualizado!');
        setType('sucess');
      })
      .catch((erro) => console.log(erro));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm); // se ele está como false ele vira true, se está como true virá false
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container customClass="column">
            {message && <Message type={type} mensagem={message} />}
            <div className={styles.detailsContainer}>
              <h1>Projeto: {project.name}</h1>
              {/* condição 1
              se o formulário não estiver sendo exibido irá aparecer editar projeto, se não irá aparecer fechar  */}
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>
              {/* condição 2 */}
              {!showProjectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>Categoria:</span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span>R$ {project.orcamento}
                  </p>
                  <p>
                    <span>Total de Utilizado:</span>R$ {project.custo}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfo}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.serviceFormContainer}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.projectInfo}>
                {showServiceForm && <div>formulário do serviço</div>}
              </div>
            </div>
            <h2>serviços</h2>
            <Container customClass="start">
              <p>itens de serviços</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
