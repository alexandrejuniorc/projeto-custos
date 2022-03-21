import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Message from '../layout/Message';
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import styles from './Projects.module.css';
import ProjectCard from '../project/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]); // estado que começa com um array vazio

  const [removeLoading, setRemoveLoading] = useState(false); // estado que começa falso que será o carregamento da página

  const [projectMessage, setProjectMessage] = useState(''); // estado que começa a mensagem

  const location = useLocation(); // consigo resgatar o valor de outro arquivo
  let message = '';

  if (location.state) {
    message = location.state.message; // valor atribuido a message
  }

  useEffect(() => {
    //setTimeout adicionado para que o loader seja exibido por 3 segundos
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: 'GET', // método para pegar da api
        headers: { 'Content-Type': 'application/json' },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          setProjects(data); // setar os projetos por meio da api
          setRemoveLoading(true); // deixa o carregamento da página ativo enquanto carrega
        })
        .catch((erro) => console.log(erro));
    }, 300);
  }, []);

  // função pra remover os projetos salvos no banco de dados
  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resposta) => resposta.json())
      .then(() => {
        setProjects(projects.filter((projeto) => projeto.id !== id)); //irá o excluir o id que está no banco de dados
        //mensagem de remoção
        setProjectMessage('Projeto removido com sucesso!');
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Novo Projeto" />
      </div>
      {/* condição 1
      se o message tiver preenchido irá imprimir a regra de mensagem */}
      {message && <Message type="sucess" mensagem={message} />}
      {projectMessage && <Message type="sucess" mensagem={projectMessage} />}
      <Container customClass="start">
        {/* condição 2
        se o tamanho de projetos for maior que 0 irá mostrar um array novo a cada vez que o formulário seja preenchido com seus dados */}
        {projects.length > 0 &&
          projects.map((projeto) => (
            <ProjectCard
              id={projeto.id}
              name={projeto.name}
              orcamento={projeto.orcamento}
              categoria={projeto.category.name}
              key={projeto.id}
              handleRemove={removeProject}
            />
          ))}
        {/* condição 3
          se for diferente de false irá aparecer o loading enquanto não carrega a página */}
        {!removeLoading && <Loading />}
        {/* condição 4
        se ao carregar a página e não tiver nenhum projeto cadastrado irá aparecer um texto falando que não possui projetos cadastrados */}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
};

export default Projects;
